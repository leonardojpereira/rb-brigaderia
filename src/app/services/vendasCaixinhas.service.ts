import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VendasCaixinhasService {
  constructor(private httpClient: HttpClient) {}

  getVendas(pageNumber: number, pageSize: number, date?: string): Observable<any> {
    const token = localStorage.getItem('token');
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (date) {
      params = params.set('date', date);
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
}
