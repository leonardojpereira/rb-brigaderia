import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientService } from '../../../services/ingredient.service';

@Component({
  selector: 'app-modal-cadastro-produto',
  templateUrl: './modal-cadastro-produto.component.html',
  styleUrls: ['./modal-cadastro-produto.component.scss'],
})
export class ModalCadastroProdutoComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() produto: any = null;
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();

  newProduct = {
    nome: '',
    unidadeMedida: '',
    quantidade: null,
    quantidadeMinima: null,
    precoUnitario: null,
    dataEntrada: '',
  };

  isLoading: boolean = false;
  subscription: Subscription | undefined;

  constructor(private ingredientService: IngredientService) {}

  ngOnChanges() {
    if (this.produto) {
      this.newProduct = { ...this.produto };
    } else {
      this.resetForm();
    }
  }

  resetForm() {
    this.newProduct = {
      nome: '',
      unidadeMedida: '',
      quantidade: null,
      quantidadeMinima: null,
      precoUnitario: null,
      dataEntrada: '',
    };
  }

  close() {
    this.onClose.emit();
  }

  save() {
    if (!this.isEditMode) {
      this.isLoading = true;

      console.log(this.newProduct);

      const payload = {
        name: this.newProduct.nome,
        measurement: this.newProduct.unidadeMedida,
        stock: this.newProduct.quantidade,
        minimumStock: this.newProduct.quantidadeMinima,
        unitPrice: this.newProduct.precoUnitario,
      };

      this.subscription = this.ingredientService
        .addIngredient(payload)
        .subscribe({
          next: (response) => {
            console.log('Produto adicionado com sucesso:', response);
            this.onSave.emit(response);
            this.close();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Erro ao adicionar o produto:', error);
            this.isLoading = false;
          },
        });
    } else {
      this.onSave.emit(this.newProduct);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
