import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Professor } from 'src/app/models/professor.model';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor-create',
  templateUrl: './professor-create.component.html',
  styleUrls: ['./professor-create.component.scss'],
})
export class ProfessorCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly professorService: ProfessorService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      email: [null, [Validators.required]],
      dataNasc: [null, [Validators.required]],
      graduacao: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const professor: Professor = this.form.value;
      this.professorService
        .create(professor)
        .pipe(
          catchError((err) => {
            this.professorService.showMessage(
              'Professor não pode ser cadastrado!',
              true
            );
            return err;
          })
        )
        .subscribe(() => {
          this.professorService.showMessage(
            'Professor cadastrado com sucesso!'
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
