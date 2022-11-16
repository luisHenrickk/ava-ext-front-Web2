import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Avaliacao } from 'src/app/models/avaliacao.model';
import { AvaliacaoService } from '../../services/avaliacao.service';

@Component({
  selector: 'app-avaliacao-edit',
  templateUrl: './avaliacao-edit.component.html',
  styleUrls: ['./avaliacao-edit.component.scss'],
})
export class AvaliacaoEditComponent implements OnInit {
  id!: number;
  avaliacao!: Avaliacao;
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly avaliacaoService: AvaliacaoService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('idAvaliacao')!;
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      metodoAvaliativo: [null, [Validators.required]],
    });
    this.avaliacaoService.findById(this.id).subscribe((resp) => {
      this.avaliacao = resp;
      this.form.patchValue(this.avaliacao);
    });
  }
  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const avaliacao: Avaliacao = this.form.value;
      this.avaliacaoService
        .update(this.id, avaliacao)
        .pipe(
          catchError((err) => {
            this.avaliacaoService.showMessage(
              'Avaliação não pode ser atualizada!',
              true
            );
            return err;
          })
        )
        .subscribe((resp) => {
          this.avaliacaoService.showMessage(
            'Avaliação atualizada com sucesso!'
          );
          this.router.navigate([
            `/avaliacao/${this.route.snapshot.paramMap.get('id')!}`,
          ]);
        });
    } else {
      this.avaliacaoService.showMessage(
        'Há campos inválidos no formulário',
        true
      );
    }
  }

  cancel(): void {
    this.router.navigate([
      `/avaliacao/${this.route.snapshot.paramMap.get('id')!}`,
    ]);
  }
}
