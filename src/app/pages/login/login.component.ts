import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ILoginModel } from '../../core/models/ILoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  isLoading: boolean = false;
  modalError: boolean = false;
  titulo: string = '';
  subTitulo: string = '';

  constructor(private loginService: LoginService){}

  logar(event: ILoginModel) {
    this.isLoading = true;

      this.loginService.login(event, {
        onSuccess: () => {},
        onError: (httpErrorResponse: { status: number; error: { errors: any; }; }) => {
          this.isLoading = false;
          if (
            httpErrorResponse.status === 400 &&
            httpErrorResponse.error &&
            httpErrorResponse.error.errors
          ) {
            this.handleErrorModal(httpErrorResponse.error.errors);
          } else {
            this.isLoading = false;
            console.error('Erro inesperado:', httpErrorResponse);
          }
        },
      });

    }

    handleErrorModal(message: string): void {
      this.modalError = true;
      this.titulo = 'Erro!';
      this.subTitulo = message;
      this.isLoading = false;
    }
}
