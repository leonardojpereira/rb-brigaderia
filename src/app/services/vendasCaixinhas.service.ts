import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VendasCaixinhasService {
  constructor(private httpClient: HttpClient) {}

  getVendas(
    pageNumber: number,
    pageSize: number,
    date?: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (date) {
      params = params.set('date', date);
    }

    return this.httpClient.get(environment.apiUrl + 'VendasCaixinhas', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      params: params,
    });
  }

  // vendasCaixinhas.service.ts
getMonthlySales(year: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.get(`${environment.apiUrl}VendasCaixinhasMetrics/month-with-most-sales?year=${year}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  }
  
}
