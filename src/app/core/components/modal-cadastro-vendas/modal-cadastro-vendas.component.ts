import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { VendasCaixinhasService } from '../../../services/vendasCaixinhas.service';

@Component({
  selector: 'app-modal-cadastro-vendas',
  templateUrl: './modal-cadastro-vendas.component.html',
  styleUrls: ['./modal-cadastro-vendas.component.scss'],
})
export class ModalCadastroVendasComponent implements OnInit {
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

  loadVendaDetails(): void {
  }

  closeModal(): void {
    this.onClose.emit();
  }

  save(form: any): void {
    if (form.valid) {
      const vendaData = {
        ...this.venda,
        dataVenda: new Date().toISOString(),
      };

      if (this.isEditMode && this.vendaId) {
        // this.updateVenda(vendaData);
      } else {
        this.createVenda(vendaData);
      }
    } else {
      this.onError.emit('Preencha todos os campos obrigatórios antes de salvar.');
    }
  }

  // updateVenda(vendaData: any): void {
  //   this.vendasCaixinhasService.updateVenda(this.vendaId!, vendaData).subscribe({
  //     next: (response) => {
  //       if (response.isSuccess) {
  //         this.onSave.emit(response.data);
  //         this.closeModal();
  //       } else {
  //         this.onError.emit('Erro ao atualizar venda');
  //       }
  //     },
  //     error: () => {
  //       this.isLoading = false;
  //       this.onError.emit('Erro inesperado ao atualizar venda');
  //     },
  //   });
  // }

  createVenda(vendaData: any): void {
    this.vendasCaixinhasService.createVenda(vendaData).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.onSave.emit(response.data);
          this.closeModal();
        } else {
          this.onError.emit('Erro ao salvar venda');
        }
      },
      error: () => {
        this.isLoading = false;
        this.onError.emit('Erro inesperado ao salvar venda');
      },
    });
  }
}
