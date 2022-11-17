import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from 'src/app/models/aluno.model';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from '../../services/curso.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-aluno-curso',
  templateUrl: './aluno-curso.component.html',
  styleUrls: ['./aluno-curso.component.scss'],
})
export class AlunoCursoComponent implements OnInit {
  cursos: Curso[] = [];
  form: FormGroup = new FormGroup({});
  selectedValue!: Curso;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Aluno,
    private readonly cursoService: CursoService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cursos: [null, [Validators.required]],
    });

    this.cursoService.listArray().subscribe((resp) => {
      this.cursos = resp;
      this.cursos.sort((a: Curso, b: Curso) =>
        a.descricao.localeCompare(b.descricao)
      );
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.cursoService
        .addAluno(this.selectedValue.id, this.data)
        .pipe(
          catchError((err) => {
            this.cursoService.showMessage(
              'Erro ao matricular o aluno no curso!',
              true
            );
            return err;
          })
        )
        .subscribe(() => {
          this.cursoService.showMessage(
            'Aluno matriculado no curso com sucesso!'
          );
        });
    } else {
      this.cursoService.showMessage('Há campos inválidos no formulário', true);
    }
  }
}
