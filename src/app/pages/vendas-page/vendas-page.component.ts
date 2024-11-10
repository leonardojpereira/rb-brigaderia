import { Component, HostListener, OnInit } from '@angular/core';
import { IPaginacaoModel } from '../../core/models/IPaginacaoModel';
import { delay } from 'rxjs/operators';
import { VendasCaixinhasService } from '../../services/vendasCaixinhas.service';

@Component({
  selector: 'app-vendas-page',
  templateUrl: './vendas-page.component.html',
  styleUrls: ['./vendas-page.component.scss'],
})
export class VendasPageComponent implements OnInit {
  vendas: any[] = [];
  columns = [
    { field: 'dataVenda', header: 'Data da venda' },
    { field: 'quantidadeCaixinhas', header: 'Quantidade' },
    { field: 'precoTotalVenda', header: 'Total da venda' },
    { field: 'salario', header: 'Salário' },
    { field: 'custoTotal', header: 'Custo total' },
    { field: 'lucro', header: 'Lucro' },
    { field: 'localVenda', header: 'Local' },
    { field: 'horarioInicio', header: 'Horário de entrada' },
    { field: 'horarioFim', header: 'Horário de saída' },
  ];

  isLoading: boolean = false;
  paginacao: IPaginacaoModel = {
    pageNumber: 1,
    pageSize: 7,
    totalItem: 0,
  };

  date: string | undefined;

  constructor(private vendasCaixinhasService: VendasCaixinhasService) {}

  ngOnInit(): void {
    this.getVendas();
  }


  getVendas(): void {
    this.isLoading = true;
    this.vendasCaixinhasService
      .getVendas(this.paginacao.pageNumber, this.paginacao.pageSize, this.date)
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.vendas = response.data.vendasCaixinhas.map((venda: any) => ({
              dataVenda: new Date(venda.dataVenda).toLocaleDateString(),
              quantidadeCaixinhas: venda.quantidadeCaixinhas,
              precoTotalVenda: this.formatCurrency(venda.precoTotalVenda),
              salario: this.formatCurrency(venda.salario),
              custoTotal: this.formatCurrency(venda.custoTotal),
              lucro: this.formatCurrency(venda.lucro),
              localVenda: venda.localVenda,
              horarioInicio: venda.horarioInicio,
              horarioFim: venda.horarioFim,
            }));
            this.paginacao.totalItem = response.data.totalItems;
          }
        },
        error: (error) =>
          console.error('Erro ao carregar vendas de caixinhas:', error),
        complete: () => (this.isLoading = false),
      });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  onDateInicialChange(date: string): void {
    this.date = date;
    this.getVendas();
  }

  getPaginacao(event: any): void {
    this.paginacao.pageNumber = event.pageNumber;
    this.paginacao.pageSize = event.pageSize;
    this.getVendas();
  }
}
