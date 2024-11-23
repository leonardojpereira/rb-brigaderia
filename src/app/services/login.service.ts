import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ILoginModel } from '../core/models/ILoginModel';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, public httpClient: HttpClient) {
    this.userLoggedIn.next(false);
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }
  get isLoggedIn() {
    return this.userLoggedIn.asObservable();
  }

  // saveToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  validateToken(token: string): boolean {
    const segments = token.split('.');
    if (segments.length === 3) {
      const payload = JSON.parse(atob(segments[1]));
      return typeof payload === 'object' && payload !== null;
    }
    return false;
  }

  login(login: ILoginModel, { onSuccess, onError }: any): any {
    const payload = {
      login: login.email,
      password: login.senha,
    };

    localStorage.clear();
    this.httpClient
      .post(environment.apiUrl + `Authentication/Login`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (res: any) => {
          if (res.isSuccess && res.data && res.data.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('nmUsuario', res.data.nome);
            localStorage.setItem('role', res.data.role);
          } else {
            console.error('Token não encontrado na resposta');
          }

          this.setUserLoggedIn(true);
          this.router.navigate(['/dashboard']);
          return onSuccess(res);
        },
        error: (error: any) => {
          return onError(error);
        },
      });
  }

  loginAd(login: any, { onSuccess, onError }: any): any {
    this.httpClient
      .post(environment.apiUrl + `Auth/LoginAd`, login, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          type: 'application/json',
        },
      })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.Dados.Token);
          localStorage.setItem('nmUsuario', res.Dados.InformacoesToken.Nome);
          localStorage.setItem('idUsuario', res.Dados.InformacoesToken.Id);
          localStorage.setItem(
            'roles',
            JSON.stringify(res.Dados.InformacoesToken.Claims)
          );
          localStorage.setItem('usuario', JSON.stringify(res.Dados));

          this.setUserLoggedIn(true);
          this.router.navigate(['/home']);

          return onSuccess(res);
        },
        error: (error: any) => {
          return onError(error);
        },
      });
  }

  esqueceuSenha(email: any, { onSuccess, onError }: any) {
    let url = environment.apiUrl + 'Auth/EsqueceuSenha';
    this.httpClient
      .post(url, email, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          type: 'application/json',
        },
      })
      .subscribe({
        next: (res: any) => {
          return onSuccess(res);
        },
        error: (error: any) => {
          return onError(error);
        },
      });
  }

  logout(): void {
    localStorage.clear();
    this.setUserLoggedIn(false);
    this.router.navigate(['/login']);
  }

  registerUser(user: { nome: string; username: string; password: string; email: string; roleId: string }): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.post(`${environment.apiUrl}Authentication/Register`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

}
