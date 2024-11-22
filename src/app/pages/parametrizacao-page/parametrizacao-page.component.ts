import { Component, OnInit } from '@angular/core';
import { IPaginacaoModel } from '../../core/models/IPaginacaoModel';
import { delay } from 'rxjs/operators';
import { ParametrizacaoService } from '../../services/parametrizacao.service';

@Component({
  selector: 'app-parametrizacao-page',
  templateUrl: './parametrizacao-page.component.html',
  styleUrls: ['./parametrizacao-page.component.scss'],
})
export class ParametrizacaoPageComponent implements OnInit {
  paginacao: IPaginacaoModel = {
    pageNumber: 1,
    pageSize: 7,
    totalItem: 0,
  };

  columns = [
    { field: 'nomeVendedor', header: 'Nome do vendedor(a)' },
    { field: 'precoCaixinha', header: 'Preço da caixinha' },
    { field: 'custo', header: 'Custo' },
    { field: 'lucro', header: 'Lucro' },
    { field: 'localVenda', header: 'Local de venda' },
    { field: 'hasPassagem', header: 'Passagem' },
    { field: 'horarioInicio', header: 'Horário de início' },
    { field: 'horarioFim', header: 'Horário de fim' },
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
  parametrizacoes: any[] = [];
  isModalVisible: boolean = false;
  isEditMode: boolean = false;
  parametrizacaoId: string = '';
  isDeleteModalOpen: boolean = false;
  isDisabled: boolean = false;
  modalSuccess: boolean = false;
  titulo: string = '';
  subTitulo: string = '';
  modalError: boolean = false;
  filter: string = '';
  filterTimeout: any;
  role: string = '';

  constructor(private parametrizacaoService: ParametrizacaoService) {}

  ngOnInit(): void {
    this.getPermissao();
    this.fetchParametrizacoes();
  }

  getPermissao(): void {
    this.role = localStorage.getItem('role') || '';
    if (this.role === 'User') {
      this.isDisabled = true;
      return;
    }
  }

  fetchParametrizacoes(): void {
    this.isLoading = true;
    this.parametrizacaoService
      .getParametrizacoes(this.paginacao.pageNumber, this.paginacao.pageSize, this.filter)
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.parametrizacoes = response.data.parametrizacoes.map((item: any) => ({
              id: item.id,
              nomeVendedor: item.nomeVendedor,
              precoCaixinha: this.formatCurrency(item.precoCaixinha),
              custo: this.formatCurrency(item.custo),
              lucro: this.formatCurrency(item.lucro),
              localVenda: item.localVenda,
              horarioInicio: item.horarioInicio,
              horarioFim: item.horarioFim,
              hasPassagem: item.precisaPassagem ? 'Sim' : 'Não',
            }));
            this.paginacao.totalItem = response.data.totalItems;
          }
        },
        error: (error) => {
          console.error('Erro ao buscar parametrizações:', error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
  

  openModal(isEdit: boolean = false, parametrizacao?: any): void {
    this.isEditMode = isEdit;
    this.isModalVisible = true;

    if (isEdit && parametrizacao) {
      this.parametrizacaoId = parametrizacao.id;
    } else {
      this.resetSelectedParametrizacao();
    }
  }

  handleErrorModal(message: string): void {
    this.modalError = true;
    this.titulo = 'Erro!';
    this.subTitulo = message;
    this.isModalVisible = false;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  onParametrizacaoSaved(): void {
    this.closeModal();
    this.fetchParametrizacoes();
    this.handleSuccessModal();
  }

  onError(message: string): void {
    this.handleErrorModal(message);
  }

  openDeleteModal(id: string): void {
    this.parametrizacaoId = id;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  deleteParametrizacao(): void {
    this.parametrizacaoService.deleteParametrizacao(this.parametrizacaoId).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.fetchParametrizacoes();
        this.handleSuccessModal('Parametrização deletada com sucesso!');
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

  handleSuccessModal(subTitle: string = 'Parametrização salva com sucesso!'): void {
    this.modalSuccess = true;
    this.titulo = 'Sucesso!';
    this.subTitulo = subTitle;
  }

  resetSelectedParametrizacao(): void {
    this.parametrizacaoId = '';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  getPaginacao(event: any): void {
    this.paginacao.pageNumber = event.pageNumber;
    this.paginacao.pageSize = event.pageSize;
    this.fetchParametrizacoes();
  }

  onFilterChange(filterValue: string): void {
    this.filter = filterValue;

    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.fetchParametrizacoes();
    }, 1000);
  }
}
