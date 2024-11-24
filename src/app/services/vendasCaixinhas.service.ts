import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VendasCaixinhasService {
  constructor(private httpClient: HttpClient) {}

  getVendas(pageNumber: number, pageSize: number, date?: string, nomeVendedor?: string): Observable<any> {
    const token = localStorage.getItem('token');
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (date) {
      params = params.set('date', date);
    }

    if (nomeVendedor) {
      params = params.set('nomeVendedor', nomeVendedor);
    }

    return this.httpClient.get(`${environment.apiUrl}VendasCaixinhas`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      params: params,
    });
  }

  getMonthlySales(year: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.get(`${environment.apiUrl}VendasCaixinhasMetrics/month-with-most-sales?year=${year}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  }

  getMonthlySalesSummary(year: number, month: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    const params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString());

    return this.httpClient.get(`${environment.apiUrl}VendasCaixinhasMetrics/monthly-sales`, {
      headers: headers,
      params: params,
    });
  }

  createVenda(vendaData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.post(`${environment.apiUrl}VendasCaixinhas`, vendaData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  }

  getVendaById(vendaId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.get(`${environment.apiUrl}VendasCaixinhas/${vendaId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  }

  updateVenda(vendaId: string, vendaData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.put(`${environment.apiUrl}VendasCaixinhas/${vendaId}`, vendaData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  }

  deleteVenda(vendaId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.delete(`${environment.apiUrl}VendasCaixinhas/${vendaId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  }

  getResumeVendas(nomeVendedor: string, mes?: number, ano?: number, pageNumber: number = 1, pageSize: number = 7): Observable<any> {
    const token = localStorage.getItem('token');
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
  
    if (nomeVendedor) {
      params = params.set('nomeVendedor', nomeVendedor);
    }
    if (mes) {
      params = params.set('mes', mes.toString());
    }
    if (ano) {
      params = params.set('ano', ano.toString());
    }
  
    return this.httpClient.get(`${environment.apiUrl}VendasCaixinhas/Resume`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      params,
    });
  }
  
  
}
