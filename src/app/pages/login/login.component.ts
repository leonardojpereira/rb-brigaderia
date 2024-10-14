import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ILoginModel } from '../../core/models/ILoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  loader: boolean = false;

  constructor(private loginService: LoginService){}

  logar(event: ILoginModel) {
    this.loader = true;

      this.loginService.login(event, {
        onSuccess: (res: any) => {},
        onError: (error: any) => {
          this.loader = false;
          if (error.status != 400) {
            console.error("Ocorreu um erro, tente novamente mais tarde!");
          } else {
            error.error.Erros?.map((x: any) => {
              console.error(x);
            });
            // this.toast.error('Email ou senha inválidos!');
          }
        },
      });

    }
}
