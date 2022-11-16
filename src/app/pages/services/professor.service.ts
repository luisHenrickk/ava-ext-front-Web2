import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { Professor } from 'src/app/models/professor.model';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  baseApi: string = '/professor';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(
      environment.baseURL + this.baseApi,
      professor
    );
  }

  findById(id: number): Observable<Professor> {
    return this.http.get<Professor>(
      environment.baseURL + this.baseApi + `/${id}`
    );
  }

  update(id: number, professor: Professor): Observable<Professor> {
    return this.http.patch<Professor>(
      environment.baseURL + this.baseApi + `/${id}`,
      professor
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.baseURL + this.baseApi + `/${id}`
    );
  }

  listArray(): Observable<Professor[]> {
    const params = new HttpParams().set('limit', '99');
    return this.http
      .get<ResponseDataList<Professor>>(environment.baseURL + this.baseApi, {
        params,
      })
      .pipe(map((resp) => resp.items));
  }

  list(
    page: number,
    limit: number,
    search?: string
  ): Observable<ResponseDataList<Professor>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Professor>>(
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
