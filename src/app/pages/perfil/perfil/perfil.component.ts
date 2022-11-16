import { Role, Usuario } from './../../../models/usuario.model';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { Professor } from 'src/app/models/professor.model';
import { ProfessorService } from '../../services/professor.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { Telefone } from 'src/app/models/telefone.model';
import { MatPaginator } from '@angular/material/paginator';
import { Certificado } from 'src/app/models/certificado.model';
import { TelefoneService } from '../../services/telefone.service';
import { CertificadoService } from '../../services/certificado.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit, AfterViewInit, OnDestroy {
  id!: number;
  user: Usuario | null = null;
  formProfessor: FormGroup = new FormGroup({});
  formAluno: FormGroup = new FormGroup({});

  @ViewChild(MatPaginator) paginatorT!: MatPaginator;

  isLoadingResultsT: boolean = true;
  dataT: Telefone[] = [];
  resultsLenghtT: number = 0;
  subscriptionsT: Subscription[] = [];
  displayedColumnsT: string[] = ['id', 'telefone', 'tipo', 'action'];
  formT!: FormGroup;
  refreshT: Subject<boolean> = new Subject();

  @ViewChild(MatPaginator) paginatorC!: MatPaginator;

  isLoadingResultsC: boolean = true;
  dataC: Certificado[] = [];
  resultsLenghtC: number = 0;
  subscriptionsC: Subscription[] = [];
  displayedColumnsC: string[] = ['id', 'areaCertificado', 'link', 'action'];
  formC!: FormGroup;
  refreshC: Subject<boolean> = new Subject();
  constructor(
    private readonly router: Router,
    private readonly professorService: ProfessorService,
    private readonly telefoneService: TelefoneService,
    private readonly certificadoService: CertificadoService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.formT = this.fb.group({
      search: [],
    });

    const subT = this.formT
      .get('search')!
      .valueChanges.pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe(() => {
        this.paginatorT.firstPage();
        this.refreshT.next(true);
      });
    this.subscriptionsT.push(subT);

    this.user = this.authenticationService.getCurrentUserValue();
    if (this.user?.role === Role.Professor) {
      this.formC = this.fb.group({
        search: [],
      });
      const subC = this.formC
        .get('search')!
        .valueChanges.pipe(distinctUntilChanged(), debounceTime(150))
        .subscribe(() => {
          this.paginatorC.firstPage();
          this.refreshC.next(true);
        });
      this.subscriptionsC.push(subC);

      this.formProfessor = this.fb.group({
        nome: [null, [Validators.required]],
        cpf: [null, [Validators.required]],
        email: [null, [Validators.required]],
        dataNasc: [null, [Validators.required]],
        graduacao: [null, [Validators.required]],
      });
      this.formProfessor.patchValue(this.user);
    } else if (this.user?.role === Role.Aluno) {
      this.formAluno = this.fb.group({
        nome: [null, [Validators.required]],
        cpf: [null, [Validators.required]],
        email: [null, [Validators.required]],
        dataNasc: [null, [Validators.required]],
      });
      this.formAluno.patchValue(this.user);
    }
  }

  ngAfterViewInit(): void {
    const subT = merge(this.refreshT, this.paginatorT.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResultsT = true;
          const search = this.formT.get('search')?.value;
          return this.telefoneService
            .list(
              this.paginatorT.pageIndex + 1,
              this.paginatorT.pageSize,
              search
            )
            .pipe(catchError(() => of(null)));
        }),
        map((data) => {
          this.isLoadingResultsT = false;
          if (data) {
            this.resultsLenghtT = data.meta.totalItems;
            return data.items;
          }
          return [];
        })
      )
      .subscribe((data) => (this.dataT = data));
    this.subscriptionsT.push(subT);

    if (this.user?.role === Role.Professor) {
      const subC = merge(this.refreshC, this.paginatorC.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResultsC = true;
            const search = this.formC.get('search')?.value;
            return this.certificadoService
              .list(
                this.paginatorC.pageIndex + 1,
                this.paginatorC.pageSize,
                search
              )
              .pipe(catchError(() => of(null)));
          }),
          map((data) => {
            this.isLoadingResultsC = false;
            if (data) {
              this.resultsLenghtC = data.meta.totalItems;
              return data.items;
            }
            return [];
          })
        )
        .subscribe((data) => (this.dataC = data));
      this.subscriptionsC.push(subC);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionsT.forEach((sub) => sub.unsubscribe());

    if (this.user?.role === Role.Professor) {
      this.subscriptionsT.forEach((sub) => sub.unsubscribe());
    }
  }

  save(): void {
    this.formProfessor.markAllAsTouched();
    if (this.formProfessor.valid) {
      const professor: Professor = this.formProfessor.value;
      this.professorService
        .update(this.id, professor)
        .pipe(
          catchError((err) => {
            this.professorService.showMessage(
              'Perfil não pode ser atualizado!',
              true
            );
            return err;
          })
        )
        .subscribe(() => {
          this.professorService.showMessage('Perfil atualizado com sucesso!');
          this.router.navigate(['/']);
        });
    } else {
      this.professorService.showMessage(
        'Há campos inválidos no formulário',
        true
      );
    }
  }

  checkRole(roles: string[]): boolean {
    return !!this.user && roles.indexOf(this.user.role) > -1;
  }
}
