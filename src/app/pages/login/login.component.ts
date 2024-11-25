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

  ngOnInit(): void {
  }


  logar(event: ILoginModel) {
    this.isLoading = true;
  
    this.loginService.login(event, {
      onSuccess: (res) => {
        console.log('Login realizado com sucesso:', res);
        this.isLoading = false;
      },
      onError: (httpErrorResponse) => {
        console.log('Erro ao realizar login:', httpErrorResponse);
        this.isLoading = false;
  
        if (
          httpErrorResponse.status === 400 &&
          httpErrorResponse.error &&
          httpErrorResponse.error.errors
        ) {
          this.handleErrorModal(httpErrorResponse.error.errors);
        } else {
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
