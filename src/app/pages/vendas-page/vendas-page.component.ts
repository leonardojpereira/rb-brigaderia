import { Component, OnInit } from '@angular/core';
import { IPaginacaoModel } from '../../core/models/IPaginacaoModel';
import { delay } from 'rxjs/operators';
import { VendasCaixinhasService } from '../../services/vendasCaixinhas.service';

@Component({
  selector: 'app-vendas-page',
  templateUrl: './vendas-page.component.html',
  styleUrls: ['./vendas-page.component.scss'],
})
export class VendasPageComponent implements OnInit {
  paginacao: IPaginacaoModel = {
    pageNumber: 1,
    pageSize: 7,
    totalItem: 0,
  };

  columns = [
    { field: 'dataVenda', header: 'Data da venda' },
    { field: 'nomeVendedor', header: 'Vendedor(a)' },
    { field: 'quantidadeCaixinhas', header: 'Quantidade de vendas' },
    { field: 'precoTotalVenda', header: 'Faturamento' },
    { field: 'salario', header: 'Salário' },
    { field: 'custoTotal', header: 'Custo' },
    { field: 'lucro', header: 'Lucro' },
    { field: 'localVenda', header: 'Local' },
    { field: 'horarioInicio', header: 'Horário de entrada' },
    { field: 'horarioFim', header: 'Horário de saída' },
  ];

  actions = [
    {
      icon: 'edit',
      action: (item: any) => this.openModal(true, item),
    },
    {
      icon: 'delete',
      action: (item: any) => this.openDeleteModal(item.id),
    },
  ];

  isLoading = false;
  vendas: any[] = [];
  filter: string = '';
  isModalVisible: boolean = false;
  isEditMode: boolean = false;
  selectedVenda: any = null;
  isDisabled: boolean = false;
  vendaId: string = '';
  isDeleteModalOpen = false;
  modalSuccess: boolean = false;
  modalError: boolean = false;
  titulo: string = '';
  subTitulo: string = '';
  filterTimeout: any;
  date: string = '';

  constructor(private vendasCaixinhasService: VendasCaixinhasService) {}

  ngOnInit(): void {
    this.fetchVendas();
  }

  fetchVendas(): void {
    this.isLoading = true;
    this.vendasCaixinhasService
      .getVendas(this.paginacao.pageNumber, this.paginacao.pageSize, this.date)  
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.vendas = response.data.vendasCaixinhas.map((venda: any) => ({
              id: venda.id,
              dataVenda: new Date(venda.dataVenda).toLocaleDateString(),
              quantidadeCaixinhas: venda.quantidadeCaixinhas,
              precoTotalVenda: this.formatCurrency(venda.precoTotalVenda),
              salario: venda.nomeVendedor != "Rebeca" ? this.formatCurrency(venda.salario) : "---",
              custoTotal: this.formatCurrency(venda.custoTotal),
              lucro: this.formatCurrency(venda.lucro),
              localVenda: venda.localVenda,
              horarioInicio: venda.horarioInicio,
              horarioFim: venda.horarioFim,
              nomeVendedor: venda.nomeVendedor,
            }));
            this.paginacao.totalItem = response.data.totalItems;
          }
        },
        error: (error) => {
          console.error('Erro ao buscar as vendas:', error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  onDateInicialChange(date: string): void {
    this.date = date;  
    this.fetchVendas();  
  }

  openModal(isEdit: boolean = false, venda?: any): void {
    this.isEditMode = isEdit;
    this.isModalVisible = true;

    if (isEdit && venda) {
      this.vendaId = venda.id;
      this.selectedVenda = venda;
    } else {
      this.resetSelectedVenda();
    }
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  onVendaSaved(vendaData: any): void {
    console.log('Venda saved:', vendaData);
    this.isModalVisible = false;
    this.fetchVendas();
    this.handleSuccessModal();
  }

  openDeleteModal(id: string): void {
    this.vendaId = id;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  deleteVenda(): void {
    this.vendasCaixinhasService.deleteVenda(this.vendaId).subscribe({
      next: () => {
        this.isDeleteModalOpen = false;
        this.fetchVendas();
        this.handleDeleteSuccessModal();
      },
      error: (httpErrorResponse) => {
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

  handleSuccessModal(): void {
    this.modalSuccess = true;
    this.titulo = 'Sucesso!';
    this.subTitulo = this.isEditMode
      ? 'Venda atualizada com sucesso!'
      : 'Venda cadastrada com sucesso!';
  }

  handleDeleteSuccessModal(): void {
    this.modalSuccess = true;
    this.titulo = 'Sucesso!';
    this.subTitulo = 'Venda deletada com sucesso!';
  }

  handleErrorModal(message: string): void {
    this.modalError = true;
    this.titulo = 'Erro!';
    this.subTitulo = message;
  }

  private resetSelectedVenda(): void {
    this.selectedVenda = {
      dataVenda: '',
      quantidadeCaixinhas: 0,
      precoTotalVenda: 0,
      salario: 0,
      custoTotal: 0,
      lucro: 0,
      localVenda: '',
      horarioInicio: '',
      horarioFim: '',
    };
    this.vendaId = '';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  onFilterChange(filterValue: string): void {
    this.filter = filterValue;

    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.fetchVendas();
    }, 500);
  }

  getPaginacao(event: any): void {
    this.paginacao.pageNumber = event.pageNumber;
    this.paginacao.pageSize = event.pageSize;
    this.fetchVendas();
  }
  
}
