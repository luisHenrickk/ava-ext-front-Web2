import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ResponseDataList } from 'src/app/models/shared';
import { Telefone } from 'src/app/models/telefone.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TelefoneService {
  baseApi: string = '/telefone';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(telefone: Telefone): Observable<Telefone> {
    return this.http.post<Telefone>(
      environment.baseURL + this.baseApi,
      telefone
    );
  }

  findById(id: number): Observable<Telefone> {
    return this.http.get<Telefone>(
      environment.baseURL + this.baseApi + `/${id}`
    );
  }

  update(id: number, telefone: Telefone): Observable<Telefone> {
    return this.http.patch<Telefone>(
      environment.baseURL + this.baseApi + `/${id}`,
      telefone
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
  ): Observable<ResponseDataList<Telefone>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Telefone>>(
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
