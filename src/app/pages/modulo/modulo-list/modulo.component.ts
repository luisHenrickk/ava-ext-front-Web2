import { Curso } from 'src/app/models/curso.model';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Modulo } from 'src/app/models/modulo.model';
import { ModuloService } from '../../services/modulo.service';
import { CursoService } from '../../services/curso.service';
import { ModuloDeleteComponent } from '../modulo-delete/modulo-delete.component';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss'],
})
export class ModuloComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  id!: number;
  curso!: Curso;
  user: Usuario | null = null;
  isLoadingResults: boolean = true;
  data: Modulo[] = [];
  resultsLenght: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'descricao', 'nivel', 'action'];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly moduloService: ModuloService,
    private readonly cursoService: CursoService,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.getCurrentUserValue();
    this.id = +this.route.snapshot.paramMap.get('id')!;
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

    this.cursoService.findById(this.id).subscribe((resp) => {
      this.curso = resp;
    });
  }

  ngAfterViewInit(): void {
    const sub = merge(this.refresh, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const search = this.form.get('search')?.value;
          return this.moduloService
            .list(this.paginator.pageIndex + 1, this.paginator.pageSize, search)
            .pipe(catchError(() => of(null)));
        }),
        map((data) => {
          this.isLoadingResults = false;
          if (data) {
            this.resultsLenght = data.meta.totalItems;
            return data.items;
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

  navigateToModuloCreate(): void {
    this.router.navigate([`/modulo/${this.id}/create`]);
  }

  openDeleteDialog(modulo: Modulo): void {
    const dialogRef = this.dialog.open(ModuloDeleteComponent, {
      data: modulo,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.moduloService.delete(modulo.id as number).subscribe(() => {
          this.paginator.firstPage;
          this.refresh.next(true);
          this.moduloService.showMessage('Modulo excluído com sucesso!');
        });
      }
    });
  }

  checkRole(roles: string[]): boolean {
    return !!this.user && roles.indexOf(this.user.role) > -1;
  }
}
