import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Aula } from 'src/app/models/aula.model';

import { AulaDeleteComponent } from '../aula-delete/aula-delete.component';
import { AulaService } from './../../services/aula.service';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.scss'],
})
export class AulaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoadingResults: boolean = true;
  data: Aula[] = [];
  resultsLenght: number = 0;
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'descricao', 'duracao', 'modulo'];
  form!: FormGroup;
  refresh: Subject<boolean> = new Subject();

  constructor(
    private readonly router: Router,
    private readonly aulaService: AulaService,
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
          return this.aulaService
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
    this.router.navigate(['curso/create']);
  }

  openDeleteDialog(aula: Aula): void {
    const dialogRef = this.dialog.open(AulaDeleteComponent, {
      data: aula,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.aulaService.delete(aula.id as number).subscribe(() => {
          this.paginator.firstPage;
          this.refresh.next(true);
          this.aulaService.showMessage('Curso excluído com sucesso!');
        });
      }
    });
  }
}
