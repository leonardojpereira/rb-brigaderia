import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './core/components/auth/auth.component';
import { InputComponent } from './core/components/input/input.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './core/components/loader/loader.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MenuSidebarComponent } from './core/components/menu-sidebar/menu-sidebar.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { EstoquePageComponent } from './pages/estoque-page/estoque-page.component';
import { HeaderComponent } from './core/components/header/header.component';
import { ResumoEstoqueCardComponent } from './core/components/resumo-estoque-card/resumo-estoque-card.component';
import { CustomTableComponent } from './core/components/custom-table/custom-table.component';
import { PaginacaoComponent } from './core/components/paginacao/paginacao.component';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/modal/modal.component';
import { CustomButtonComponent } from './core/components/custom-button/custom-button.component';
import { CardReceitasProduzidasComponent } from './core/components/card-receitas-produzidas/card-receitas-produzidas.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AuthComponent,
    InputComponent,
    LoaderComponent,
    MenuSidebarComponent,
    LayoutComponent,
    MenuComponent,
    EstoquePageComponent,
    HeaderComponent,
    ResumoEstoqueCardComponent,
    CustomTableComponent,
    PaginacaoComponent,
    ModalComponent,
    CustomButtonComponent,
    ModalCadastroProdutoComponent,
    ModalSucessoComponent,
    BrigadeiroLoadingComponent,
    ModalErroComponent,
    ModalConfirmacaoComponent,
    ReceitaPageComponent,
    CardReceitasProduzidasComponent,
    ModalCadastroReceitaComponent,
    CustomSelectComponent,
    ProducaoPageComponent,
    ModalCadastroProducaoComponent,
    ConfiguracoesPageComponent,
    ModalCadastroUsuarioComponent,
    EntradaSaidaPageComponent,
    VendasPageComponent,
    MonthSalesChartComponent,
    ModalCadastroVendasComponent,
    CardResumoEstoqueDashboardComponent,
    ResumoVendasDashboardComponent,
    ParametrizacaoPageComponent,
    ModalCadastroParametrizacaoComponent,
    ResumoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSelectModule,
    NgxChartsModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: PaginacaoComponent,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }import { CommonModule } from '@angular/common';
import { ModalCadastroProdutoComponent } from './core/components/modal-cadastro-produto/modal-cadastro-produto.component';
import { ModalSucessoComponent } from './core/components/modal-sucesso/modal-sucesso.component';
import { BrigadeiroLoadingComponent } from './core/components/brigadeiro-loading/brigadeiro-loading.component';
import { ModalErroComponent } from './core/components/modal-erro/modal-erro.component';
import { ModalConfirmacaoComponent } from './core/components/modal-confirmacao/modal-confirmacao.component';
import { ReceitaPageComponent } from './pages/receita-page/receita-page.component';
import { ModalCadastroReceitaComponent } from './core/components/modal-cadastro-receita/modal-cadastro-receita.component';
import { CustomSelectComponent } from './core/components/custom-select/custom-select.component';
import { ProducaoPageComponent } from './pages/producao-page/producao-page.component';
import { ModalCadastroProducaoComponent } from './core/components/modal-cadastro-producao/modal-cadastro-producao.component';
import { ConfiguracoesPageComponent } from './pages/configuracoes-page/configuracoes-page.component';
import { ModalCadastroUsuarioComponent } from './core/components/modal-cadastro-usuario/modal-cadastro-usuario.component';
import { EntradaSaidaPageComponent } from './pages/entrada-saida-page/entrada-saida-page.component';
import { VendasPageComponent } from './pages/vendas-page/vendas-page.component';
import { MonthSalesChartComponent } from './core/components/month-sales-chart/month-sales-chart.component';
import { ModalCadastroVendasComponent } from './core/components/modal-cadastro-vendas/modal-cadastro-vendas.component';
import { CardResumoEstoqueDashboardComponent } from './core/components/card-resumo-estoque-dashboard/card-resumo-estoque-dashboard.component';
import { ResumoVendasDashboardComponent } from './core/components/resumo-vendas-dashboard/resumo-vendas-dashboard.component';
import { ParametrizacaoPageComponent } from './pages/parametrizacao-page/parametrizacao-page.component';
import { ModalCadastroParametrizacaoComponent } from './core/components/modal-cadastro-parametrizacao/modal-cadastro-parametrizacao.component';import { AuthInterceptor } from './auth.interceptor';
import { ResumoPageComponent } from './pages/resumo-page/resumo-page.component';

