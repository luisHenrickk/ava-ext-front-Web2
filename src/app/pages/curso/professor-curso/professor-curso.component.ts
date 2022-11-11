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
import { CursoService } from '../curso.service';
import { ProfessorCursoDeleteComponent } from '../professor-curso-delete/professor-curso-delete.component';

@Component({
  selector: 'app-professor-curso',
  templateUrl: './professor-curso.component.html',
  styleUrls: ['./professor-curso.component.scss'],
})
export class ProfessorCursoComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
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

  navigateToCursoCreate(): void {
    this.router.navigate(['cursoProfessor/create']);
  }

  openDeleteDialog(curso: Curso): void {
    const dialogRef = this.dialog.open(ProfessorCursoDeleteComponent, {
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
}
