import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './../../shared/authentication.service';
import { MessagesService } from './../../shared/messages.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly messagesService: MessagesService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [],
      senha: [],
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { email, senha } = this.form.value;
      this.authenticationService
        .login(email, senha)
        .pipe(
          catchError((error) => {
            this.messagesService.error(error.error.message);
            return throwError(() => error);
          })
        )
        .subscribe((resp) => {
          if (resp) {
            this.router.navigate(['/']);
          } else {
            this.messagesService.error('E-mail ou senha inválidos!');
          }
        });
    } else {
      this.messagesService.error('Há campos inválidos no formulário!');
    }
  }
}
