import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  baseApi: string = '/curso';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(environment.baseURL + this.baseApi, curso);
  }

  findById(id: number): Observable<Curso> {
    return this.http.get<Curso>(environment.baseURL + this.baseApi + `/${id}`);
  }

  update(id: number, curso: Curso): Observable<Curso> {
    return this.http.patch<Curso>(
      environment.baseURL + this.baseApi + `/${id}`,
      curso
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
  ): Observable<ResponseDataList<Curso>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Curso>>(
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
