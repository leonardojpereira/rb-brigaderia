import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EstoquePageComponent } from './pages/estoque-page/estoque-page.component';
import { ReceitaPageComponent } from './pages/receita-page/receita-page.component';
import { ProducaoPageComponent } from './pages/producao-page/producao-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'estoque',
    component: EstoquePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'receitas',
    component: ReceitaPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'producoes',
    component: ProducaoPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
