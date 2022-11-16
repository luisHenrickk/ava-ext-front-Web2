import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Professor } from 'src/app/models/professor.model';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor-edit',
  templateUrl: './professor-edit.component.html',
  styleUrls: ['./professor-edit.component.scss'],
})
export class ProfessorEditComponent implements OnInit {
  id!: number;
  professor!: Professor;
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly professorService: ProfessorService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      email: [null, [Validators.required]],
      dataNasc: [null, [Validators.required]],
      graduacao: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });
    this.professorService.findById(this.id).subscribe((resp) => {
      this.professor = resp;
      this.form.patchValue(this.professor);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const professor: Professor = this.form.value;
      this.professorService
        .update(this.id, professor)
        .pipe(
          catchError((err) => {
            this.professorService.showMessage(
              'Professor não pode ser atualizado!',
              true
            );
            return err;
          })
        )
        .subscribe(() => {
          this.professorService.showMessage(
            'Professor atualizado com sucesso!'
          );
          this.router.navigate(['/professor']);
        });
    } else {
      this.professorService.showMessage(
        'Há campos inválidos no formulário',
        true
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/professor']);
  }
}
