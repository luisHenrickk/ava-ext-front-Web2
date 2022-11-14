import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

import { Aluno } from './../../models/aluno.model';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  baseApi: string = '/aluno';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(environment.baseURL + this.baseApi, aluno);
  }

  findById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(environment.baseURL + this.baseApi + `/${id}`);
  }

  update(id: number, aluno: Aluno): Observable<Aluno> {
    return this.http.patch<Aluno>(
      environment.baseURL + this.baseApi + `/${id}`,
      aluno
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.baseURL + this.baseApi + `/${id}`
    );
  }

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Aluno>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Aluno>>(
      environment.baseURL + this.baseApi,
      { params }
    );
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }
}
