import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

import { Questao } from './../../models/questao.model';

@Injectable({
  providedIn: 'root',
})
export class QuestaoService {
  baseApi: string = '/questao';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(questao: Questao): Observable<Questao> {
    return this.http.post<Questao>(environment.baseURL + this.baseApi, questao);
  }

  findById(id: number): Observable<Questao> {
    return this.http.get<Questao>(
      environment.baseURL + this.baseApi + `/${id}`
    );
  }

  update(id: number, questao: Questao): Observable<Questao> {
    return this.http.patch<Questao>(
      environment.baseURL + this.baseApi + `/${id}`,
      questao
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
  ): Observable<ResponseDataList<Questao>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Questao>>(
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
