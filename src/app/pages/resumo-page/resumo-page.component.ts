import { Component, OnInit } from '@angular/core';
import { VendasCaixinhasService } from '../../services/vendasCaixinhas.service';
import { ParametrizacaoService } from '../../services/parametrizacao.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-resumo-page',
  templateUrl: './resumo-page.component.html',
  styleUrls: ['./resumo-page.component.scss']
})
export class ResumoPageComponent implements OnInit {
  resumoVendedoras: any[] = [];
  isLoading: boolean = false;
  isDisabled: boolean = false;
  vendedorOptions: { value: string; label: string }[] = [];
  selectedVendedor: string = '';
  selectedMonth: number | null = null;
  selectedYear: number | null = null;

  columns = [
    { field: 'date', header: 'Data' },
    { field: 'nomeVendedor', header: 'Vendedor(a)' },
    { field: 'totalFaturamento', header: 'Faturamento' },
    { field: 'totalCusto', header: 'Custo' },
    { field: 'totalSalario', header: 'Salário' },
    { field: 'totalLucro', header: 'Lucro' },
  ];

  paginacao = {
    pageNumber: 1,
    pageSize: 7,
    totalItem: 0
  };

  constructor(
    private vendasCaixinhasService: VendasCaixinhasService,
    private parametrizacaoService: ParametrizacaoService
  ) {}

  ngOnInit(): void {
    this.loadVendedores();
    this.fetchResumoVendas();
  }

  loadVendedores(): void {
    this.parametrizacaoService.getVendedores().subscribe({
      next: (response) => {
        if (response.isSuccess && response.data?.vendedores) {
          this.vendedorOptions = [
            { value: '', label: 'Todos' }, 
            ...response.data.vendedores.map((vendedor: { nomeVendedor: string }) => ({
              value: vendedor.nomeVendedor,
              label: vendedor.nomeVendedor,
            })),
          ];
        }
      },
      error: () => console.error('Erro ao buscar os vendedores'),
    });
  }

  fetchResumoVendas(): void {
    this.isLoading = true;

    const mes = this.selectedMonth ?? undefined;
    const ano = this.selectedYear ?? undefined;

    this.vendasCaixinhasService
      .getResumeVendas(this.selectedVendedor, mes, ano, this.paginacao.pageNumber, this.paginacao.pageSize)
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          if (response.isSuccess && response.data) {
            this.resumoVendedoras = response.data.resumoPorVendedora.map((vendedora: any) => ({
              nomeVendedor: vendedora.nomeVendedor,
              totalFaturamento: this.formatCurrency(vendedora.totalFaturamento),
              totalSalario: vendedora.nomeVendedor == "Rebeca" ? "---" : this.formatCurrency(vendedora.totalSalario),
              totalCusto: this.formatCurrency(vendedora.totalCusto),
              totalLucro: this.formatCurrency(vendedora.totalLucro),
              date: vendedora.date,
            }));
            this.paginacao.totalItem = response.data.totalItems; // Atualiza o total de itens para a paginação
          }
        },
        error: (error) => console.error('Erro ao buscar resumo de vendas:', error),
        complete: () => (this.isLoading = false),
      });
  }

  onSelectChange(vendedor: string): void {
    this.selectedVendedor = vendedor;
    this.paginacao.pageNumber = 1; // Reinicia a paginação ao alterar o filtro
    this.fetchResumoVendas();
  }

  onMonthChange(month: number): void {
    this.selectedMonth = month;
    this.paginacao.pageNumber = 1; // Reinicia a paginação ao alterar o filtro
    this.fetchResumoVendas();
  }

  onYearChange(year: number): void {
    this.selectedYear = year;
    this.paginacao.pageNumber = 1; // Reinicia a paginação ao alterar o filtro
    this.fetchResumoVendas();
  }

  onPaginacaoChange(event: any): void {
    this.paginacao.pageNumber = event.pageNumber;
    this.paginacao.pageSize = event.pageSize;
    this.fetchResumoVendas();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}
