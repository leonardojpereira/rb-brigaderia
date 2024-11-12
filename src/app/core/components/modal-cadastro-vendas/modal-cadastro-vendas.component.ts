import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { VendasCaixinhasService } from '../../../services/vendasCaixinhas.service';

@Component({
  selector: 'app-modal-cadastro-vendas',
  templateUrl: './modal-cadastro-vendas.component.html',
  styleUrls: ['./modal-cadastro-vendas.component.scss'],
})
export class ModalCadastroVendasComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() vendaId: string | null = null;
  @Input() isDisabled: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onError = new EventEmitter<string>();

  venda = {
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
  isLoading: boolean = false;

  constructor(private vendasCaixinhasService: VendasCaixinhasService) {}

  ngOnInit(): void {
    if (this.isEditMode && this.vendaId) {
      this.loadVendaDetails();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && this.isVisible && this.isEditMode && this.vendaId) {
      this.loadVendaDetails();
    }
  }

  loadVendaDetails(): void {
    if (!this.vendaId) return;
    
    this.isLoading = true;
    this.vendasCaixinhasService.getVendaById(this.vendaId).subscribe({
      next: (response) => {
        if (response.isSuccess && response.data?.vendaCaixinhas) {
          const vendaData = response.data.vendaCaixinhas;
          this.venda = {
            dataVenda: vendaData.dataVenda.split('T')[0], // Extrai apenas a data no formato 'yyyy-MM-dd'
            quantidadeCaixinhas: vendaData.quantidadeCaixinhas,
            precoTotalVenda: vendaData.precoTotalVenda,
            salario: vendaData.salario,
            custoTotal: vendaData.custoTotal,
            lucro: vendaData.lucro,
            localVenda: vendaData.localVenda,
            horarioInicio: vendaData.horarioInicio,
            horarioFim: vendaData.horarioFim,
          };
        }
      },
      error: () => {
        this.onError.emit('Erro ao carregar detalhes da venda.');
      },
      complete: () => {
        this.isLoading = false;
      },
    }); 
  }
  

  closeModal(): void {
    this.onClose.emit();
  }

  save(form: any): void {
    if (form.valid) {
      const vendaData = {
        ...this.venda,
        dataVenda: new Date(this.venda.dataVenda).toISOString(),
      };

      if (this.isEditMode && this.vendaId) {
        this.updateVenda(vendaData);
      } else {
        this.createVenda(vendaData);
      }
    } else {
      this.onError.emit('Preencha todos os campos obrigatórios antes de salvar.');
    }
  }

  createVenda(vendaData: any): void {
    this.vendasCaixinhasService.createVenda(vendaData).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.onSave.emit(response.data);
          this.closeModal();
        } else {
          this.onError.emit('Erro ao salvar venda.');
        }
      },
      error: () => {
        this.isLoading = false;
        this.onError.emit('Erro inesperado ao salvar venda.');
      },
    });
  }

  updateVenda(vendaData: any): void {
    if (!this.vendaId) return;

    this.vendasCaixinhasService.updateVenda(this.vendaId, vendaData).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.onSave.emit(response.data);
          this.closeModal();
        } else {
          this.onError.emit('Erro ao atualizar venda.');
        }
      },
      error: (httpErrorResponse) => {
        this.isLoading = false;
        if (
          httpErrorResponse.status === 400 &&
          httpErrorResponse.error &&
          httpErrorResponse.error.errors
        ) {
          this.onError.emit(httpErrorResponse.error.errors);
        } else {
          console.error('Erro inesperado:', httpErrorResponse);
        }
      },
    });
  }
}
