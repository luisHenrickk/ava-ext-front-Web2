import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  of,
  startWith,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from '../../services/curso.service';
import { CursoDeleteComponent } from '../curso-delete/curso-delete.component';
import { Role, Usuario } from 'src/app/models/usuario.model';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss'],
})
export class CursoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  user: Usuario | null = null;
  isLoadingResults: boolean = true;
  data: Curso[] = [];
  resultsLenght: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'descricao', 'area', 'action'];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly cursoService: CursoService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUserValue();
    this.form = this.fb.group({
      search: [],
    });

    const sub = this.form
      .get('search')!
      .valueChanges.pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe(() => {
        this.paginator.firstPage();
        this.refresh.next(true);
      });
    this.subscriptions.push(sub);
  }

  ngAfterViewInit(): void {
    const user = this.authenticationService.getCurrentUserValue();
    const sub = merge(this.refresh, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const search = this.form.get('search')?.value;
          return this.cursoService
            .list(this.paginator.pageIndex + 1, this.paginator.pageSize, search)
            .pipe(catchError(() => of(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          if (data) {
            const cursos: Curso[] = [];
            if (user?.role === Role.Admin) {
              this.resultsLenght = data.meta.totalItems;
              return data.items;
            }
            if (user?.role === Role.Professor) {
              data.items.forEach((element) => {
                if (element.professor?.id === user?.id) {
                  cursos.push(element);
                }
              });
            }
            if (user?.role === Role.Aluno) {
              data.items.forEach((element1) => {
                element1.alunos?.forEach((element2) => {
                  if (element2.id === user?.id) {
                    cursos.push(element1);
                  }
                });
              });
            }
            this.resultsLenght = cursos.length;
            return cursos;
          }
          return [];
        })
      )
      .subscribe((data) => (this.data = data));
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  navigateToCursoCreate(): void {
    this.router.navigate(['curso/create']);
  }

  openDeleteDialog(curso: Curso): void {
    const dialogRef = this.dialog.open(CursoDeleteComponent, {
      data: curso,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cursoService.delete(curso.id as number).subscribe(() => {
          this.paginator.firstPage;
          this.refresh.next(true);
          this.cursoService.showMessage('Curso excluído com sucesso!');
        });
      }
    });
  }

  checkRole(roles: string[]): boolean {
    return !!this.user && roles.indexOf(this.user.role) > -1;
  }
}
