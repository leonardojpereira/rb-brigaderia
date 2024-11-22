import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ParametrizacaoService } from '../../../services/parametrizacao.service';

@Component({
  selector: 'app-modal-cadastro-parametrizacao',
  templateUrl: './modal-cadastro-parametrizacao.component.html',
  styleUrls: ['./modal-cadastro-parametrizacao.component.scss'],
})
export class ModalCadastroParametrizacaoComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() parametrizacaoId: string | null = null;
  @Input() isDisabled: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onError = new EventEmitter<string>();

  parametrizacao = {
    nomeVendedor: '',
    precoCaixinha: 0,
    custo: 0,
    lucro: 0,
    localVenda: '',
    horarioInicio: '',
    horarioFim: '',
    precisaPassagem: false,
    precoPassagem: 5.2 as number | null,
  };
  isLoading: boolean = false;

  constructor(private parametrizacaoService: ParametrizacaoService) {}

  ngOnInit(): void {
    if (this.isEditMode && this.parametrizacaoId) {
      this.loadParametrizacaoDetails();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && this.isVisible) {
      if (this.isEditMode && this.parametrizacaoId) {
        this.loadParametrizacaoDetails();
      } else {
        this.resetParametrizacao();
      }
    }
  }

  handlePrecisaPassagemChange(newValue: boolean): void {
    this.parametrizacao.precisaPassagem = newValue;

    if (newValue) {
      if (this.parametrizacao.precoPassagem === null) {
        this.parametrizacao.precoPassagem = 5.2;
      }
    } else {
      this.parametrizacao.precoPassagem = null;
    }
  }

  resetParametrizacao(): void {
    this.parametrizacao = {
      nomeVendedor: '',
      precoCaixinha: 0,
      custo: 0,
      lucro: 0,
      localVenda: '',
      horarioInicio: '',
      horarioFim: '',
      precisaPassagem: false,
      precoPassagem: 5.2,
    };
  }

  loadParametrizacaoDetails(): void {
    if (!this.parametrizacaoId) return;

    this.isLoading = true;
    this.parametrizacaoService
      .getParametrizacaoById(this.parametrizacaoId)
      .subscribe({
        next: (response) => {
          if (response.isSuccess && response.data?.parametrizacao) {
            const data = response.data.parametrizacao;
            this.parametrizacao = {
              nomeVendedor: data.nomeVendedor || '',
              precoCaixinha: data.precoCaixinha || 0,
              custo: data.custo || 0,
              lucro: data.lucro || 0,
              localVenda: data.localVenda || '',
              horarioInicio: data.horarioInicio || '',
              horarioFim: data.horarioFim || '',
              precisaPassagem: data.precisaPassagem || false,
              precoPassagem: data.precoPassagem || null,
            };
          } else {
            this.onError.emit('Erro ao carregar os dados da parametrização.');
          }
        },
        error: () => {
          this.onError.emit('Erro ao carregar os detalhes da parametrização.');
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
      if (this.isEditMode && this.parametrizacaoId) {
        this.updateParametrizacao();
      } else {
        this.createParametrizacao();
      }
    } else {
      this.onError.emit(
        'Preencha todos os campos obrigatórios antes de salvar.'
      );
    }
  }

  createParametrizacao(): void {
    this.parametrizacaoService
      .createParametrizacao(this.parametrizacao)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.onSave.emit(response.data);
            this.closeModal();
            this.resetParametrizacao();
          } else {
            this.onError.emit('Erro ao salvar parametrização.');
          }
        },
        error: () => {
          this.onError.emit('Erro inesperado ao salvar parametrização.');
        },
      });
  }

  updateParametrizacao(): void {
    if (!this.parametrizacaoId) return;

    this.parametrizacaoService
      .updateParametrizacao(this.parametrizacaoId, this.parametrizacao)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.onSave.emit(response.data);
            this.closeModal();
          } else {
            this.onError.emit('Erro ao atualizar parametrização.');
          }
        },
        error: (error) => {
          this.onError.emit('Erro inesperado ao atualizar parametrização.');
          console.error(error);
        },
      });
  }
}
