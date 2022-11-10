import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppRedDirective } from './directives/appRed.directive';
import { ProfessorCursoComponent } from './pages/curso/professor-curso/professor-curso.component';
import { ProfessorHomeComponent } from './pages/professor-home/professor-home.component';
import { FooterComponent } from './sharepages/footer/footer.component';
import { HeaderComponent } from './sharepages/header/header.component';
import { NavbarComponent } from './sharepages/navbar/navbar.component';
import { ProfessorCursoCreateComponent } from './pages/curso/professor-curso-create/professor-curso-create.component';

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
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    AppRoutingModule,
    MatListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
