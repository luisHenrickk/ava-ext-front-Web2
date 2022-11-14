import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aula } from 'src/app/models/aula.model';

@Component({
  selector: 'app-aula-delete',
  templateUrl: './aula-delete.component.html',
  styleUrls: ['./aula-delete.component.scss'],
})
export class AulaDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Aula) {}

  ngOnInit(): void {}
}
