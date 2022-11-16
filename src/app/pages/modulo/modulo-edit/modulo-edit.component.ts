import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Modulo } from 'src/app/models/modulo.model';
import { ModuloService } from '../../services/modulo.service';

@Component({
  selector: 'app-modulo-edit',
  templateUrl: './modulo-edit.component.html',
  styleUrls: ['./modulo-edit.component.scss'],
})
export class ModuloEditComponent implements OnInit {
  id!: number;
  modulo!: Modulo;
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly moduloService: ModuloService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('idModulo')!;
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      frequenciaMinima: [null, [Validators.required]],
      nivel: [null, [Validators.required]],
    });
    this.moduloService.findById(this.id).subscribe((resp) => {
      this.modulo = resp;
      this.form.patchValue(this.modulo);
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const modulo: Modulo = this.form.value;
      this.moduloService
        .update(this.id, modulo)
        .pipe(
          catchError((err) => {
            this.moduloService.showMessage(
              'Modulo não pode ser atualizado!',
              true
            );
            return err;
          })
        )
        .subscribe(() => {
          this.moduloService.showMessage('Modulo atualizado com sucesso!');
          this.router.navigate([
            `/modulo/${this.route.snapshot.paramMap.get('id')!}`,
          ]);
        });
    } else {
      this.moduloService.showMessage('Há campos inválidos no formulário', true);
    }
  }

  cancel(): void {
    this.router.navigate([
      `/modulo/${this.route.snapshot.paramMap.get('id')!}`,
    ]);
  }
}
