import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Aula } from 'src/app/models/aula.model';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
  baseApi: string = '/aula';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(aula: Aula): Observable<Aula> {
    return this.http.post<Aula>(environment.baseURL + this.baseApi, aula);
  }

  findById(id: number): Observable<Aula> {
    return this.http.get<Aula>(environment.baseURL + this.baseApi + `/${id}`);
  }

  update(id: number, avaliacao: Aula): Observable<Aula> {
    return this.http.patch<Aula>(
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
  ): Observable<ResponseDataList<Aula>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Aula>>(
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
