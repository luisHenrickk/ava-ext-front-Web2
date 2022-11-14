import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Aula } from 'src/app/models/aula.model';
import { Modulo } from 'src/app/models/modulo.model';

import { AulaService } from '../../services/aula.service';
import { ModuloService } from '../../services/modulo.service';

@Component({
  selector: 'app-aula-create',
  templateUrl: './aula-create.component.html',
  styleUrls: ['./aula-create.component.scss'],
})
export class AulaCreateComponent implements OnInit {
  modulos: Modulo[] = [];
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly aulaService: AulaService,
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
      const aula: Aula = this.form.value;
      this.aulaService
        .create(aula)
        .pipe(
          catchError((err) => {
            this.aulaService.showMessage('Aula não pode ser cadastrada!', true);
            return err;
          })
        )
        .subscribe((resp) => {
          this.moduloService.showMessage('Aula cadastrada com sucesso!');
          this.router.navigate(['/aula']);
        });
    } else {
      this.aulaService.showMessage('Há campos inválidos no formulário', true);
    }
  }

  cancel(): void {
    this.router.navigate(['/aula']);
  }
}
