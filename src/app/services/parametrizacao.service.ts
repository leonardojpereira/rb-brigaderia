import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParametrizacaoService {
  constructor(private httpClient: HttpClient) {}

  getParametrizacoes(pageNumber: number, pageSize: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.httpClient.get(`${environment.apiUrl}Parametrizacao`, {
      headers: headers,
      params: params,
    });
  }

  createParametrizacao(parametrizacaoData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(`${environment.apiUrl}v1/Parametrizacao`, parametrizacaoData, {
      headers: headers,
    });
  }

  deleteParametrizacao(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.delete(`${environment.apiUrl}Parametrizacao/${id}`, {
      headers: headers,
    });
  }
}
