import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id!: number;
  modulo!: Modulo;
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly avaliacaoService: AvaliacaoService,
    private readonly moduloService: ModuloService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      metodoAvaliativo: [null, [Validators.required]],
    });
    this.moduloService.findById(this.id).subscribe((resp) => {
      this.modulo = resp;
    });
  }
  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const avaliacao: Avaliacao = this.form.value;
      avaliacao.modulo = this.modulo;
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
          this.router.navigate([`/avaliacao/${this.id}`]);
        });
    } else {
      this.avaliacaoService.showMessage(
        'Há campos inválidos no formulário',
        true
      );
    }
  }

  cancel(): void {
    this.router.navigate([`/avaliacao/${this.id}`]);
  }
}
