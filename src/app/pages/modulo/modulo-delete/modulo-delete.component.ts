import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Modulo } from 'src/app/models/modulo.model';

@Component({
  selector: 'app-modulo-delete',
  templateUrl: './modulo-delete.component.html',
  styleUrls: ['./modulo-delete.component.scss'],
})
export class ModuloDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Modulo) {}

  ngOnInit(): void {}
}
