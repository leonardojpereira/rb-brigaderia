import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './core/components/auth/auth.component';
import { InputComponent } from './core/components/input/input.component';
import { CutomButtonComponent } from './core/components/cutom-button/cutom-button.component';
import { CertificadoComponent } from './core/components/certificado/certificado.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './core/components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AuthComponent,
    InputComponent,
    CutomButtonComponent,
    CertificadoComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
