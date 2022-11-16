import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from 'src/app/models/aluno.model';

@Component({
  selector: 'app-aluno-delete',
  templateUrl: './aluno-delete.component.html',
  styleUrls: ['./aluno-delete.component.scss'],
})
export class AlunoDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Aluno) {}

  ngOnInit(): void {}
}
