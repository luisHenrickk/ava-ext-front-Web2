import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id!: number;
  modulo!: Modulo;
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly aulaService: AulaService,
    private readonly moduloService: ModuloService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      duracao: [null, [Validators.required]],
    });
    this.moduloService.findById(this.id).subscribe((resp) => {
      this.modulo = resp;
    });
  }
  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const aula: Aula = this.form.value;
      aula.modulo = this.modulo;
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
          this.router.navigate([`/aula/${this.id}`]);
        });
    } else {
      this.aulaService.showMessage('Há campos inválidos no formulário', true);
    }
  }

  cancel(): void {
    this.router.navigate([`/aula/${this.id}`]);
  }
}
