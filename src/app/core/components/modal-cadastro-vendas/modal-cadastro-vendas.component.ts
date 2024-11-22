import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { VendasCaixinhasService } from '../../../services/vendasCaixinhas.service';
import { ParametrizacaoService } from '../../../services/parametrizacao.service';
import { debounceTime, Subject } from 'rxjs';

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
    nomeVendedor: '',
    dataVenda: '',
    quantidadeCaixinhas: 0,
    precoTotalVenda: 0,
    salario: 0,
    custoTotal: 0,
    lucro: 0,
    localVenda: '',
    horarioInicio: '',
    horarioFim: '',
    precoPassagem: 0,
    precisaPassagem: false,
  };
  vendedorOptions: { value: string; label: string }[] = [];
  isLoading: boolean = false;
  precoCaixinha: number = 0;
  custoUnitario: number = 0;
  lucroUnitario: number = 0;

  private quantidadeSubject = new Subject<number>();

  constructor(
    private vendasCaixinhasService: VendasCaixinhasService,
    private parametrizacaoService: ParametrizacaoService
  ) {}

  ngOnInit(): void {
    this.loadVendedores();
    this.setupQuantidadeListener();

    if (this.isEditMode && this.vendaId) {
      this.loadVendaDetails();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && this.isVisible) {
      if (this.isEditMode && this.vendaId) {
        this.loadVendaDetails();
      } else {
        this.resetVenda();
      }
    }
  }

  loadVendedores(): void {
    this.parametrizacaoService.getVendedores().subscribe({
      next: (response) => {
        if (response.isSuccess && response.data?.vendedores) {
          this.vendedorOptions = response.data.vendedores.map(
            (vendedor: { id: string; nomeVendedor: string }) => ({
              value: vendedor.id,
              label: vendedor.nomeVendedor,
            })
          );
        }
      },
      error: () => {
        this.onError.emit('Erro ao carregar lista de vendedores.');
      },
    });
  }

  setupQuantidadeListener(): void {
    this.quantidadeSubject.pipe(debounceTime(1000)).subscribe((quantidade) => {
    });
  }

  onQuantidadeChange(): void {
    this.quantidadeSubject.next(this.venda.quantidadeCaixinhas);
  }

  calculateTotals(quantidade: number): void {
    if (quantidade > 0) {
      this.venda.precoTotalVenda = quantidade * this.precoCaixinha;
      this.venda.custoTotal = quantidade * this.custoUnitario;
      this.venda.lucro = quantidade * this.lucroUnitario;

      if (this.venda.precisaPassagem) {
        this.venda.lucro -= this.venda.precoPassagem;
      }

      this.venda.salario = quantidade * 3;
    } else {
      this.venda.precoTotalVenda = 0;
      this.venda.custoTotal = 0;
      this.venda.lucro = 0;
      this.venda.salario = 0;
    }
  }

  onVendedorChange(vendedorId: string): void {
    if (!vendedorId) return;

    this.isLoading = true;
    this.parametrizacaoService.getParametrizacaoById(vendedorId).subscribe({
      next: (response) => {
        if (response.isSuccess && response.data?.parametrizacao) {
          const data = response.data.parametrizacao;

          this.precoCaixinha = data.precoCaixinha;
          this.custoUnitario = data.custo;
          this.lucroUnitario = data.lucro;

          this.venda.localVenda = data.localVenda;
          this.venda.horarioInicio = data.horarioInicio;
          this.venda.horarioFim = data.horarioFim;
          this.venda.precoPassagem = data.precoPassagem;

          this.venda.precisaPassagem = data.precisaPassagem;
          this.venda.precoPassagem = data.precoPassagem;
        }
      },
      error: () => {
        this.onError.emit('Erro ao carregar detalhes do vendedor.');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  resetVenda(): void {
    this.venda = {
      nomeVendedor: '',
      dataVenda: '',
      quantidadeCaixinhas: 0,
      precoTotalVenda: 0,
      salario: 0,
      custoTotal: 0,
      lucro: 0,
      localVenda: '',
      horarioInicio: '',
      horarioFim: '',
      precoPassagem: 0,
      precisaPassagem: false,
    };
    this.precoCaixinha = 0;
    this.custoUnitario = 0;
    this.lucroUnitario = 0;
  }

  loadVendaDetails(): void {
    if (!this.vendaId) return;

    this.isLoading = true;
    this.vendasCaixinhasService.getVendaById(this.vendaId).subscribe({
      next: (response) => {
        if (response.isSuccess && response.data?.vendaCaixinhas) {
          const vendaData = response.data.vendaCaixinhas;
          this.venda = {
            nomeVendedor: vendaData.nomeVendedor,
            dataVenda: vendaData.dataVenda.split('T')[0],
            quantidadeCaixinhas: vendaData.quantidadeCaixinhas,
            precoTotalVenda: vendaData.precoTotalVenda,
            salario: vendaData.salario,
            custoTotal: vendaData.custoTotal,
            lucro: vendaData.lucro,
            localVenda: vendaData.localVenda,
            horarioInicio: vendaData.horarioInicio,
            horarioFim: vendaData.horarioFim,
            precoPassagem: vendaData.precoPassagem,
            precisaPassagem: vendaData.precisaPassagem,
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
      this.onError.emit(
        'Preencha todos os campos obrigatórios antes de salvar.'
      );
    }
  }

  createVenda(vendaData: any): void {
    this.vendasCaixinhasService.createVenda(vendaData).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.onSave.emit(response.data);
          this.closeModal();
          this.resetVenda();
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
      error: (error) => {
        this.onError.emit('Erro inesperado ao atualizar venda.');
      },
    });
  }
}
