  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { environment } from '../../environments/environment';

  @Injectable({
    providedIn: 'root',
  })
  export class ParametrizacaoService {
    constructor(private httpClient: HttpClient) {}

    getParametrizacoes(pageNumber: number, pageSize: number, nomeVendedor?: string): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    
      const params: any = {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
      };
    
      if (nomeVendedor) {
        params.nomeVendedor = nomeVendedor;
      }
    
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

      return this.httpClient.post(`${environment.apiUrl}Parametrizacao`, parametrizacaoData, {
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

    getParametrizacaoById(id: string): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      return this.httpClient.get(`${environment.apiUrl}Parametrizacao/${id}`, {
        headers: headers,
      });
    }

    updateParametrizacao(id: string, parametrizacaoData: any): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      return this.httpClient.put(`${environment.apiUrl}Parametrizacao/${id}`, parametrizacaoData, {
        headers: headers,
      });
    }

    getVendedores(): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    
      return this.httpClient.get(`${environment.apiUrl}Parametrizacao/Vendedores`, {
        headers: headers,
      });
    }
    
  }
