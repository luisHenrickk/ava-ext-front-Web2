import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

import { Arquivo } from './../../models/arquivo.model';

@Injectable({
  providedIn: 'root',
})
export class ArquivoService {
  baseApi: string = '/arquivo';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(arquivo: Arquivo): Observable<Arquivo> {
    return this.http.post<Arquivo>(environment.baseURL + this.baseApi, arquivo);
  }

  findById(id: number): Observable<Arquivo> {
    return this.http.get<Arquivo>(
      environment.baseURL + this.baseApi + `/${id}`
    );
  }

  update(id: number, arquivo: Arquivo): Observable<Arquivo> {
    return this.http.patch<Arquivo>(
      environment.baseURL + this.baseApi + `/${id}`,
      arquivo
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
  ): Observable<ResponseDataList<Arquivo>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Arquivo>>(
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
