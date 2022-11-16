import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
import { Professor } from 'src/app/models/professor.model';
import { CursoService } from '../../services/curso.service';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-curso-edit',
  templateUrl: './curso-edit.component.html',
  styleUrls: ['./curso-edit.component.scss'],
})
export class CursoEditComponent implements OnInit {
  id!: number;
  curso!: Curso;
  professores: Professor[] = [];
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly cursoService: CursoService,
    private readonly professorService: ProfessorService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.professorService.listArray().subscribe((resp) => {
      this.professores = resp;
      this.professores.sort((a: Professor, b: Professor) =>
        a.nome.localeCompare(b.nome)
      );
    });
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      area: [null, [Validators.required]],
      professor: [null, [Validators.required]],
    });
    this.cursoService.findById(this.id).subscribe((resp) => {
      this.curso = resp;
      this.form.patchValue(this.curso);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const curso: Curso = this.form.value;
      this.cursoService
        .update(this.id, curso)
        .pipe(
          catchError((err) => {
            this.cursoService.showMessage(
              'Curso não pode ser atualizado!',
              true
            );
            return err;
          })
        )
        .subscribe(() => {
          this.cursoService.showMessage('Curso atualizado com sucesso!');
          this.router.navigate(['/curso']);
        });
    } else {
      this.cursoService.showMessage('Há campos inválidos no formulário', true);
    }
  }

  cancel(): void {
    this.router.navigate(['/curso']);
  }
}
