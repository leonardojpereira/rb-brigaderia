
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ILoginModel } from '../../models/ILoginModel';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  login: ILoginModel = {
    email: '',
    senha: '',
  };
  @Output() submit = new EventEmitter();
  ngOnInit(): void {}

  logar() {
    if (this.login.email !== '' && this.login.senha !== '') {
      this.submit.emit(this.login);
    } else {
      console.error('Email e senha são obrigatórios.');
    }
  }
  

}
