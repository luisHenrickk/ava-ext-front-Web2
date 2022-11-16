import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { Modulo } from 'src/app/models/modulo.model';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModuloService {
  baseApi: string = '/modulo';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(modulo: Modulo): Observable<Modulo> {
    return this.http.post<Modulo>(environment.baseURL + this.baseApi, modulo);
  }

  findById(id: number): Observable<Modulo> {
    return this.http.get<Modulo>(environment.baseURL + this.baseApi + `/${id}`);
  }

  update(id: number, modulo: Modulo): Observable<Modulo> {
    return this.http.patch<Modulo>(
      environment.baseURL + this.baseApi + `/${id}`,
      modulo
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.baseURL + this.baseApi + `/${id}`
    );
  }

  listArray(): Observable<Modulo[]> {
    const params = new HttpParams().set('limit', '99');
    return this.http
      .get<ResponseDataList<Modulo>>(environment.baseURL + this.baseApi, {
        params,
      })
      .pipe(map((resp) => resp.items));
  }

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Modulo>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Modulo>>(
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
