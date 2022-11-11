import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
import { Professor } from 'src/app/models/professor.model';
import { CursoService } from '../curso.service';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor-curso-create',
  templateUrl: './professor-curso-create.component.html',
  styleUrls: ['./professor-curso-create.component.scss'],
})
export class ProfessorCursoCreateComponent implements OnInit {
  professores: Professor[] = [];
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly cursoService: CursoService,
    private readonly professorService: ProfessorService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.professorService.list().subscribe((resp) => {
      this.professores = resp;
      this.professores.sort((a: Professor, b: Professor) =>
        a.name.localeCompare(b.name)
      );
    });
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      area: [null, [Validators.required]],
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const curso: Curso = this.form.value;
      this.cursoService
        .create(curso)
        .pipe(
          catchError((err) => {
            this.cursoService.showMessage(
              'Curso não pode ser cadastrado!',
              true
            );
            return err;
          })
        )
        .subscribe((resp) => {
          this.cursoService.showMessage('Curso cadastrado com sucesso!');
          this.router.navigate(['/cursoProfessor']);
        });
    } else {
      this.cursoService.showMessage('Há campos inválidos no formulário', true);
    }
  }

  cancel(): void {
    this.router.navigate(['/cursoProfessor']);
  }
}
