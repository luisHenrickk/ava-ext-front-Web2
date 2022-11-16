import { Professor } from 'src/app/models/professor.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-professor-delete',
  templateUrl: './professor-delete.component.html',
  styleUrls: ['./professor-delete.component.scss'],
})
export class ProfessorDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Professor) {}

  ngOnInit(): void {}
}
