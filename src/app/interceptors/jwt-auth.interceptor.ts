import { map } from 'rxjs/operators';
import { MessagesService } from './../shared/messages.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly messageService: MessagesService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.authenticationService.getCurrentUserValue();
    if (!user || !user.access_token || user.access_token.length == 0) {
      if (request.url.includes('/login') || request.url.includes('/user')) {
        return next.handle(request);
      }
      return next.handle(request).pipe(
        map(() => {
          this.messageService.error(
            'O token de autenticação expirou. Por favor, faça o login novamente.'
          );
          throw new HttpErrorResponse({
            error:
              'O token de autenticação expirou. Por favor, faça o login novamente.',
            status: 401,
            statusText: 'Unauthorized',
          });
        })
      );
    } else {
      const modified = request.clone({
        setHeaders: {
          Authorization: `${user.token_type} ${user.access_token}`,
        },
      });
      return next.handle(modified);
    }
  }
}
