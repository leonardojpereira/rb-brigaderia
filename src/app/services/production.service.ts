import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductionService {

  constructor(private httpClient: HttpClient) {}

  getAllProductions(
    pageNumber: number,
    pageSize: number,
    filter?: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (filter) {
      params = params.set('filter', filter);
    }

    return this.httpClient.get(`${environment.apiUrl}Production`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params,
    });
  }
}
