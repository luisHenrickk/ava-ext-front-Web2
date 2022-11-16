import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Aluno } from 'src/app/models/aluno.model';
import { AlunoService } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-edit',
  templateUrl: './aluno-edit.component.html',
  styleUrls: ['./aluno-edit.component.scss'],
})
export class AlunoEditComponent implements OnInit {
  id!: number;
  form: FormGroup = new FormGroup({});
  aluno!: Aluno;

  constructor(
    private readonly router: Router,
    private readonly alunoService: AlunoService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      dataNasc: [null, [Validators.required]],
    });

    this.alunoService.findById(this.id).subscribe((resp) => {
      this.aluno = resp;
      this.form.patchValue(this.aluno);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const aluno: Aluno = this.form.value;
      this.alunoService
        .update(this.id, aluno)
        .pipe(
          catchError((err) => {
            this.alunoService.showMessage(
              'Aluno não pode ser atualizado!',
              true
            );
            return err;
          })
        )
        .subscribe((resp) => {
          this.alunoService.showMessage('Aluno atualizado com sucesso!');
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
