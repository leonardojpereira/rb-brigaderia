import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { IngredientService } from '../../../services/ingredient.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-cadastro-produto',
  templateUrl: './modal-cadastro-produto.component.html',
  styleUrls: ['./modal-cadastro-produto.component.scss'],
})
export class ModalCadastroProdutoComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() productId: string | null = null;
  @Input() disabledButton: boolean = false;
  @Input() produto: {
    nome: string;
    unidadeMedida: string;
    quantidade: number | null;
    quantidadeMinima: number | null;
    precoUnitario: number | null;
    dataEntrada: string;
  } = {
    nome: '',
    unidadeMedida: '',
    quantidade: null,
    quantidadeMinima: null,
    precoUnitario: null,
    dataEntrada: '',
  };

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  @Output() onError = new EventEmitter<string>();

  isLoading = false;
  errorMessage: string | null = null;
  modalError: boolean = false;
  titulo: string = '';
  subTitulo: string = '';

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    if (this.isEditMode && this.productId) {
      this.getProdutoById();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditMode && this.productId) {
      this.getProdutoById();
    }
  }

  getProdutoById(): void {
    if (!this.productId) return;

    this.isLoading = true;
    this.ingredientService.getIngredientById(this.productId).subscribe({
      next: (response) => {
        if (response.isSuccess && response.data && response.data.ingredient) {
          const produtoData = response.data.ingredient;
          this.produto = {
            nome: produtoData.name,
            unidadeMedida: produtoData.measurement,
            quantidade: produtoData.stock,
            quantidadeMinima: produtoData.minimumStock,
            precoUnitario: produtoData.unitPrice,
            dataEntrada: produtoData.dataEntrada || '',
          };
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar produto:', error);
        this.isLoading = false;
      },
    });
  }

  save(form: NgForm): void {
    console.log('Botão salvar acionado'); 
    console.log('Formulário status:', form.status); 
    console.log('Produto:', this.produto); 

    Object.keys(form.controls).forEach(controlName => {
        const control = form.controls[controlName];
        console.log(`Campo ${controlName} status:`, control.status);
        console.log(`Campo ${controlName} erros:`, control.errors); 
    });

    if (form.valid) {
        this.isLoading = true;
        if (this.isEditMode) {
            console.log('Modo de edição ativado');
            this.updateProduto();
        } else {
            console.log('Criando novo produto');
            this.createProduto();
        }
    } else {
        console.log('Formulário inválido'); 
        this.markFormFieldsAsTouched(form);
    }
}


  createProduto(): void {
    const payload = {
      name: this.produto.nome,
      measurement: this.produto.unidadeMedida,
      stock: this.produto.quantidade,
      minimumStock: this.produto.quantidadeMinima,
      unitPrice: this.produto.precoUnitario,
    };

    this.ingredientService.addIngredient(payload).subscribe({
      next: () => {
        this.onSave.emit();
        this.closeModal();
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

  updateProduto(): void {
    if (!this.productId) {
      console.error('ID do produto não definido. Abandonando updateProduto.');
      return;
    }
  
    const payload = {
      name: this.produto.nome,
      measurement: this.produto.unidadeMedida,
      stock: this.produto.quantidade,
      minimumStock: this.produto.quantidadeMinima,
      unitPrice: this.produto.precoUnitario,
    };
  
    console.log('Enviando payload para atualização:', payload);
  
    this.ingredientService.updateIngredient(this.productId, payload).subscribe({
      next: () => {
        console.log('Produto atualizado com sucesso');
        this.onSave.emit();
        this.closeModal();
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

  handleErrorModal(message: string): void {
    this.onError.emit(message);
    this.closeModal();
  }
  

  closeModal(): void {
    this.isVisible = false;
    this.errorMessage = null;
    this.onClose.emit();
  }

  markFormFieldsAsTouched(form: NgForm): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }
}
