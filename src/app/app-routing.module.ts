import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';
import { RoleGuard } from './guards/role.guard';
import { PageComponent } from './layout/page/page.component';
import { Role } from './models/usuario.model';
import { AlunoCreateComponent } from './pages/aluno/aluno-create/aluno-create.component';
import { AlunoEditComponent } from './pages/aluno/aluno-edit/aluno-edit.component';
import { AlunoComponent } from './pages/aluno/aluno-list/aluno.component';
import { AulaCreateComponent } from './pages/aula/aula-create/aula-create.component';
import { AulaEditComponent } from './pages/aula/aula-edit/aula-edit.component';
import { AulaComponent } from './pages/aula/aula-list/aula.component';
import { AvaliacaoCreateComponent } from './pages/avaliacao/avaliacao-create/avaliacao-create.component';
import { AvaliacaoEditComponent } from './pages/avaliacao/avaliacao-edit/avaliacao-edit.component';
import { AvaliacaoComponent } from './pages/avaliacao/avaliacao-list/avaliacao.component';
import { CursoCreateComponent } from './pages/curso/curso-create/curso-create.component';
import { CursoEditComponent } from './pages/curso/curso-edit/curso-edit.component';
import { CursoComponent } from './pages/curso/curso-list/curso.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ModuloCreateComponent } from './pages/modulo/modulo-create/modulo-create.component';
import { ModuloEditComponent } from './pages/modulo/modulo-edit/modulo-edit.component';
import { ModuloComponent } from './pages/modulo/modulo-list/modulo.component';
import { PerfilComponent } from './pages/perfil/perfil/perfil.component';
import { ProfessorCreateComponent } from './pages/professor/professor-create/professor-create.component';
import { ProfessorEditComponent } from './pages/professor/professor-edit/professor-edit.component';
import { ProfessorListComponent } from './pages/professor/professor-list/professor-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: PageComponent,
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'perfil', component: PerfilComponent },
      {
        path: 'curso',
        children: [
          { path: '', component: CursoComponent },
          {
            path: 'create',
            component: CursoCreateComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin] },
          },
          {
            path: ':id/edit',
            component: CursoEditComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin] },
          },
        ],
      },
      {
        path: 'modulo/:id',
        children: [
          { path: '', component: ModuloComponent },
          {
            path: 'create',
            component: ModuloCreateComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin, Role.Professor] },
          },
          {
            path: ':idModulo/edit',
            component: ModuloEditComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin, Role.Professor] },
          },
        ],
      },
      {
        path: 'aula/:id',
        children: [
          { path: '', component: AulaComponent },
          {
            path: 'create',
            component: AulaCreateComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin, Role.Professor] },
          },
          {
            path: ':idAula/edit',
            component: AulaEditComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin, Role.Professor] },
          },
        ],
      },
      {
        path: 'professor',
        children: [
          {
            path: '',
            component: ProfessorListComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin] },
          },
          {
            path: 'create',
            component: ProfessorCreateComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin] },
          },
          {
            path: 'id:/edit',
            component: ProfessorEditComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin, Role.Professor] },
          },
        ],
      },
      {
        path: 'aluno',
        children: [
          {
            path: '',
            component: AlunoComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin, Role.Professor] },
          },
          {
            path: 'create',
            component: AlunoCreateComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin] },
          },
          {
            path: ':id/edit',
            component: AlunoEditComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin, Role.Aluno] },
          },
        ],
      },
      {
        path: 'avaliacao/:id',
        children: [
          { path: '', component: AvaliacaoComponent },
          {
            path: 'create',
            component: AvaliacaoCreateComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin, Role.Professor] },
          },
          {
            path: ':idAvaliacao/edit',
            component: AvaliacaoEditComponent,
            canActivate: [RoleGuard],
            data: { role: [Role.Admin, Role.Professor] },
          },
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
