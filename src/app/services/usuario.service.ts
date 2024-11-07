import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) {}

  getUsuarios(
    pageNumber: number = 1,
    pageSize: number = 10,
    filter: string = ''
  ): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<any>(`${environment.apiUrl}User/GetAllUsers`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        filter: filter,
      },
    });
  }

  getUsuarioById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<any>(`${environment.apiUrl}User/GetUserById/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateUsuario(id: string, usuario: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.put<any>(`${environment.apiUrl}User/UpdateUser/${id}`, usuario, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
