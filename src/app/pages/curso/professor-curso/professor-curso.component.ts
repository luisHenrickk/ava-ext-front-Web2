import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-curso',
  templateUrl: './professor-curso.component.html',
  styleUrls: ['./professor-curso.component.scss'],
})
export class ProfessorCursoComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}
  navigateToCursoCreate(): void {
    this.router.navigate(['cursoProfessor/create']);
  }
}
