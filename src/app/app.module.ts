import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRedDirective } from './directives/appRed.directive';
import { JsonDateInterceptor } from './interceptors/json-date.interceptor';
import { JwtAuthInterceptor } from './interceptors/jwt-auth.interceptor';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { PageComponent } from './layout/page/page.component';
import { AulaCreateComponent } from './pages/aula/aula-create/aula-create.component';
import { AulaDeleteComponent } from './pages/aula/aula-delete/aula-delete.component';
import { AulaComponent } from './pages/aula/aula-list/aula.component';
import { AvaliacaoCreateComponent } from './pages/avaliacao/avaliacao-create/avaliacao-create.component';
import { AvaliacaoDeleteComponent } from './pages/avaliacao/avaliacao-delete/avaliacao-delete.component';
import { AvaliacaoComponent } from './pages/avaliacao/avaliacao-list/avaliacao.component';
import { CursoCreateComponent } from './pages/curso/curso-create/curso-create.component';
import { CursoDeleteComponent } from './pages/curso/curso-delete/curso-delete.component';
import { CursoComponent } from './pages/curso/curso-list/curso.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfessorListComponent } from './pages/professor/professor-list/professor-list.component';
import { ProfessorCreateComponent } from './pages/professor/professor-create/professor-create.component';
import { ProfessorDeleteComponent } from './pages/professor/professor-delete/professor-delete.component';
import { AlunoComponent } from './pages/aluno/aluno-list/aluno.component';
import { AlunoCreateComponent } from './pages/aluno/aluno-create/aluno-create.component';
import { AlunoDeleteComponent } from './pages/aluno/aluno-delete/aluno-delete.component';
import { ModuloComponent } from './pages/modulo/modulo-list/modulo.component';
import { ModuloCreateComponent } from './pages/modulo/modulo-create/modulo-create.component';
import { ModuloDeleteComponent } from './pages/modulo/modulo-delete/modulo-delete.component';
import { AlunoEditComponent } from './pages/aluno/aluno-edit/aluno-edit.component';
import { AlunoCursoComponent } from './pages/aluno/aluno-curso/aluno-curso.component';
import { AulaEditComponent } from './pages/aula/aula-edit/aula-edit.component';
import { AvaliacaoEditComponent } from './pages/avaliacao/avaliacao-edit/avaliacao-edit.component';
import { CursoEditComponent } from './pages/curso/curso-edit/curso-edit.component';
import { ModuloEditComponent } from './pages/modulo/modulo-edit/modulo-edit.component';
import { ProfessorEditComponent } from './pages/professor/professor-edit/professor-edit.component';
import { PerfilComponent } from './pages/perfil/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CursoComponent,
    AppRedDirective,
    CursoCreateComponent,
    CursoDeleteComponent,
    PageComponent,
    LoginComponent,
    AvaliacaoComponent,
    AvaliacaoCreateComponent,
    AvaliacaoDeleteComponent,
    AulaComponent,
    AulaCreateComponent,
    AulaDeleteComponent,
    ProfessorListComponent,
    ProfessorCreateComponent,
    ProfessorDeleteComponent,
    AlunoComponent,
    AlunoCreateComponent,
    AlunoDeleteComponent,
    ModuloComponent,
    ModuloCreateComponent,
    ModuloDeleteComponent,
    AlunoEditComponent,
    AlunoCursoComponent,
    AulaEditComponent,
    AvaliacaoEditComponent,
    CursoEditComponent,
    ModuloEditComponent,
    ProfessorEditComponent,
    PerfilComponent,
  ],
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserModule,
    MatSidenavModule,
    AppRoutingModule,
    MatListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JsonDateInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
