import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
import { Modulo } from 'src/app/models/modulo.model';
import { CursoService } from '../../services/curso.service';
import { ModuloService } from '../../services/modulo.service';

@Component({
  selector: 'app-modulo-create',
  templateUrl: './modulo-create.component.html',
  styleUrls: ['./modulo-create.component.scss'],
})
export class ModuloCreateComponent implements OnInit {
  id!: number;
  curso!: Curso;
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly moduloService: ModuloService,
    private readonly cursoService: CursoService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      frequenciaMinima: [null, [Validators.required]],
      nivel: [null, [Validators.required]],
    });
    this.cursoService.findById(this.id).subscribe((resp) => {
      this.curso = resp;
    });
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const modulo: Modulo = this.form.value;
      modulo.curso = this.curso;
      this.moduloService
        .create(modulo)
        .pipe(
          catchError((err) => {
            this.moduloService.showMessage(
              'Modulo não pode ser cadastrado!',
              true
            );
            return err;
          })
        )
        .subscribe(() => {
          this.moduloService.showMessage('Modulo cadastrado com sucesso!');
          this.router.navigate([`/modulo/${this.id}`]);
        });
    } else {
      this.moduloService.showMessage('Há campos inválidos no formulário', true);
    }
  }

  cancel(): void {
    this.router.navigate([`/modulo/${this.id}`]);
  }
}
