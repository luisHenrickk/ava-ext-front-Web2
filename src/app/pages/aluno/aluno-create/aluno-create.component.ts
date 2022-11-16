import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Aluno } from 'src/app/models/aluno.model';
import { AlunoService } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-create',
  templateUrl: './aluno-create.component.html',
  styleUrls: ['./aluno-create.component.scss'],
})
export class AlunoCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly alunoService: AlunoService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      dataNasc: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const aluno: Aluno = this.form.value;
      this.alunoService
        .create(aluno)
        .pipe(
          catchError((err) => {
            this.alunoService.showMessage(
              'Aluno não pode ser cadastrado!',
              true
            );
            return err;
          })
        )
        .subscribe(() => {
          this.alunoService.showMessage('Aluno cadastrado com sucesso!');
          this.router.navigate(['/aluno']);
        });
    } else {
      this.alunoService.showMessage('Há campos inválidos no formulário', true);
    }
  }

  cancel(): void {
    this.router.navigate(['/aluno']);
  }
}
