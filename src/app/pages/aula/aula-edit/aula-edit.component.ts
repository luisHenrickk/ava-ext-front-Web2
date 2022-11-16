import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Aula } from 'src/app/models/aula.model';
import { AulaService } from '../../services/aula.service';

@Component({
  selector: 'app-aula-edit',
  templateUrl: './aula-edit.component.html',
  styleUrls: ['./aula-edit.component.scss'],
})
export class AulaEditComponent implements OnInit {
  id!: number;
  aula!: Aula;
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly router: Router,
    private readonly aulaService: AulaService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('idAula')!;
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      duracao: [null, [Validators.required]],
    });
    this.aulaService.findById(this.id).subscribe((resp) => {
      this.aula = resp;
      this.form.patchValue(this.aula);
    });
  }
  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const aula: Aula = this.form.value;
      this.aulaService
        .update(this.id, aula)
        .pipe(
          catchError((err) => {
            this.aulaService.showMessage('Aula não pode ser atualizada!', true);
            return err;
          })
        )
        .subscribe((resp) => {
          this.aulaService.showMessage('Aula atualizada com sucesso!');
          this.router.navigate([
            `/aula/${this.route.snapshot.paramMap.get('id')!}`,
          ]);
        });
    } else {
      this.aulaService.showMessage('Há campos inválidos no formulário', true);
    }
  }

  cancel(): void {
    this.router.navigate([`/aula/${this.route.snapshot.paramMap.get('id')!}`]);
  }
}
