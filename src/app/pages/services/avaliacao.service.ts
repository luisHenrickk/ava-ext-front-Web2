import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

import { Avaliacao } from './../../models/avaliacao.model';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  baseApi: string = '/avaliacao';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(
      environment.baseURL + this.baseApi,
      avaliacao
    );
  }

  findById(id: number): Observable<Avaliacao> {
    return this.http.get<Avaliacao>(
      environment.baseURL + this.baseApi + `/${id}`
    );
  }

  update(id: number, avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.patch<Avaliacao>(
      environment.baseURL + this.baseApi + `/${id}`,
      avaliacao
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
  ): Observable<ResponseDataList<Avaliacao>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Avaliacao>>(
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
