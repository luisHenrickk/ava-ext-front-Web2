import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfessorCursoCreateComponent } from './pages/curso/professor-curso-create/professor-curso-create.component';
import { ProfessorCursoComponent } from './pages/curso/professor-curso/professor-curso.component';
import { ProfessorHomeComponent } from './pages/professor-home/professor-home.component';

const routes: Routes = [
  { path: '', component: ProfessorHomeComponent },
  {
    path: 'cursoProfessor',
    children: [
      { path: '', component: ProfessorCursoComponent },
      { path: 'create', component: ProfessorCursoCreateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
