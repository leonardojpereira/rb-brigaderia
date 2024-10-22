import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './core/components/auth/auth.component';
import { InputComponent } from './core/components/input/input.component';
import { CertificadoComponent } from './core/components/certificado/certificado.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './core/components/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomButtonComponent } from './core/components/custom-button/custom-button.component';
import { MenuSidebarComponent } from './core/components/menu-sidebar/menu-sidebar.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { MenuComponent } from './core/components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AuthComponent,
    CustomButtonComponent,
    InputComponent,
    CertificadoComponent,
    LoaderComponent,
    MenuSidebarComponent,
    LayoutComponent,
    MenuComponent
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
