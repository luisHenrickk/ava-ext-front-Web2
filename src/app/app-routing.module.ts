import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';
import { PageComponent } from './layout/page/page.component';
import { AvaliacaoCreateComponent } from './pages/avaliacao/avaliacao-create/avaliacao-create.component';
import { AvaliacaoComponent } from './pages/avaliacao/avaliacao-list/avaliacao.component';
import { CursoCreateComponent } from './pages/curso/curso-create/curso-create.component';
import { CursoComponent } from './pages/curso/curso-list/curso.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: PageComponent,
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'curso',
        children: [
          { path: '', component: CursoComponent },
          { path: 'create', component: CursoCreateComponent },
        ],
      },
    ],
  },
  {
    path: '',
    component: PageComponent,
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'avaliacao',
        children: [
          { path: '', component: AvaliacaoComponent },
          { path: 'create', component: AvaliacaoCreateComponent },
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
