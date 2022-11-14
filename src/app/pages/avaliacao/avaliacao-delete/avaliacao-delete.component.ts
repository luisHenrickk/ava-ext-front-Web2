import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Avaliacao } from 'src/app/models/avaliacao.model';

@Component({
  selector: 'app-avaliacao-delete',
  templateUrl: './avaliacao-delete.component.html',
  styleUrls: ['./avaliacao-delete.component.scss'],
})
export class AvaliacaoDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Avaliacao) {}

  ngOnInit(): void {}
}
