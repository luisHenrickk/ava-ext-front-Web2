import { map } from 'rxjs/operators';
import { LoginData } from './../models/usuario.model';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseApi: string = '/auth';
  public currentUser: Observable<Usuario | null>;
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  private propertyName: string = 'currentUser';
  private tokenExpiryTime: number = 3600;

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(
      this.getUserStorage(false)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ifLoggedIn(): boolean {
    const user = this.getUserStorage(false);
    return !!(user && user.access_token !== null);
  }

  getCurrentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    this.storageService.remove(this.propertyName);
    this.currentUserSubject.next(null);
  }

  login(email: string, senha: string): Observable<Usuario | null> {
    return this.http
      .post<LoginData>(environment.baseURL + this.baseApi + '/login', {
        email,
        senha,
      })
      .pipe(
        switchMap((dataAuth) => {
          if (dataAuth?.access_token) {
            const headers = new HttpHeaders({
              Authorization: `${dataAuth.token_type} ${dataAuth.access_token}`,
            });
            return this.http
              .get<Usuario>(environment.baseURL + this.baseApi + '/user', {
                headers,
              })
              .pipe(
                map((user) => {
                  user = { ...user, ...dataAuth };
                  this.storageService.set(
                    this.propertyName,
                    user,
                    this.tokenExpiryTime
                  );

                  this.currentUserSubject.next(user);
                  return user;
                })
              );
          } else {
            return of(null);
          }
        })
      );
  }

  validateTokenExpirationTime(): void {
    if (this.storageService.isExpired(this.propertyName)) {
      this.logout();
    }
  }

  private getUserStorage(isRediret: boolean = true) {
    let user: Usuario | null = null;
    try {
      user = this.storageService.get(this.propertyName);
    } catch (error) {
      this.logout();
      if (isRediret) {
        this.router.navigate(['/login']);
      }
    }
    return user;
  }
}
