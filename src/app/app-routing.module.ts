import { AuthenticationGuard } from './guards/authentication.guard';
import { PageComponent } from './layout/page/page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursoCreateComponent } from './pages/curso/curso-create/curso-create.component';
import { ProfessorCursoComponent } from './pages/curso/curso-list/professor-curso.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfessorHomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: PageComponent,
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [
      { path: '', component: ProfessorHomeComponent },
      {
        path: 'cursoProfessor',
        children: [
          { path: '', component: ProfessorCursoComponent },
          { path: 'create', component: CursoCreateComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
