import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRedDirective } from './directives/appRed.directive';
import { ProfessorCursoComponent } from './pages/curso/professor-curso/professor-curso.component';
import { ProfessorHomeComponent } from './pages/professor-home/professor-home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ProfessorCursoCreateComponent } from './pages/curso/professor-curso-create/professor-curso-create.component';
import { ProfessorCursoDeleteComponent } from './pages/curso/professor-curso-delete/professor-curso-delete.component';
import { PageComponent } from './layout/page/page.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    ProfessorHomeComponent,
    ProfessorCursoComponent,
    AppRedDirective,
    ProfessorCursoCreateComponent,
    ProfessorCursoDeleteComponent,
    PageComponent,
    LoginComponent,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
