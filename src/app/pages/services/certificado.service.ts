import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ResponseDataList } from 'src/app/models/shared';
import { environment } from 'src/environments/environment';

import { Certificado } from './../../models/certificado.model';

@Injectable({
  providedIn: 'root',
})
export class CertificadoService {
  baseApi: string = '/certificado';
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient
  ) {}

  create(certificado: Certificado): Observable<Certificado> {
    return this.http.post<Certificado>(
      environment.baseURL + this.baseApi,
      certificado
    );
  }

  findById(id: number): Observable<Certificado> {
    return this.http.get<Certificado>(
      environment.baseURL + this.baseApi + `/${id}`
    );
  }

  update(id: number, certificado: Certificado): Observable<Certificado> {
    return this.http.patch<Certificado>(
      environment.baseURL + this.baseApi + `/${id}`,
      certificado
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
  ): Observable<ResponseDataList<Certificado>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<ResponseDataList<Certificado>>(
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
