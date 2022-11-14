import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

import { AvaliacaoService } from '../../services/avaliacao.service';
import { ModuloService } from '../../services/modulo.service';
import { Avaliacao } from './../../../models/avaliacao.model';
import { Modulo } from './../../../models/modulo.model';

@Component({
  selector: 'app-avaliacao-create',
  templateUrl: './avaliacao-create.component.html',
  styleUrls: ['./avaliacao-create.component.scss'],
})
export class AvaliacaoCreateComponent implements OnInit {
  modulos: Modulo[] = [];
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly avaliacaoService: AvaliacaoService,
    private readonly moduloService: ModuloService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.moduloService.list().subscribe((resp) => {
      this.modulos = resp;
      console.log(this.modulos);

      this.modulos.sort((a: Modulo, b: Modulo) =>
        a.descricao.localeCompare(b.descricao)
      );
    });
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      area: [null, [Validators.required]],
      professor: [null, [Validators.required]],
    });
  }
  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const avaliacao: Avaliacao = this.form.value;
      this.avaliacaoService
        .create(avaliacao)
        .pipe(
          catchError((err) => {
            this.avaliacaoService.showMessage(
              'Avaliação não pode ser cadastrada!',
              true
            );
            return err;
          })
        )
        .subscribe((resp) => {
          this.moduloService.showMessage('Avaliação cadastrada com sucesso!');
          this.router.navigate(['/avaliacao']);
        });
    } else {
      this.avaliacaoService.showMessage(
        'Há campos inválidos no formulário',
        true
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/avaliacao']);
  }
}
