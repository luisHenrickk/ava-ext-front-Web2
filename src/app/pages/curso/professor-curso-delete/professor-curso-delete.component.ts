import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/models/curso.model';

@Component({
  selector: 'app-professor-curso-delete',
  templateUrl: './professor-curso-delete.component.html',
  styleUrls: ['./professor-curso-delete.component.scss'],
})
export class ProfessorCursoDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Curso) {}

  ngOnInit(): void {}
}
