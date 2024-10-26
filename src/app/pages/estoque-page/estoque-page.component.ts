import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { IPaginacaoModel } from '../../core/models/IPaginacaoModel';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-estoque-page',
  templateUrl: './estoque-page.component.html',
  styleUrls: ['./estoque-page.component.scss'],
})
export class EstoquePageComponent implements OnInit {
  paginacao: IPaginacaoModel = {
    pageNumber: 1,
    pageSize: 7,
    totalItem: 0,
  };

  columns = [
    { header: 'Produto', field: 'name' },
    { header: 'Unidade de medida', field: 'measurement' },
    { header: 'Quantidade', field: 'stock', specialStyle: 'low-stock' },
    { header: 'Quantidade mínima', field: 'minimumStock' },
    { header: 'Preço unitário', field: 'unitPrice' },
    { header: 'Data de entrada', field: 'createdAt' },
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
  estoque: any[] = [];
  isModalVisible: boolean = false;
  isEditMode: boolean = false;
  selectedProduct: any = null;
  productId: string = '';
  modalSuccess: boolean = false;
  titulo: string = '';
  subTitulo: string = '';
  showSuccessModal: boolean = false;

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.fetchIngredients(false);
    this.resetSelectedProduct();
  }

  fetchIngredients(showSuccessModal: boolean = false): void {
    this.isLoading = true;
    this.ingredientService
      .getIngredients(this.paginacao.pageNumber, this.paginacao.pageSize)
      .pipe(delay(1000))
      .subscribe({
        next: (response) => {
          if (response.isSuccess && response.data?.ingredients) {
            this.estoque = response.data.ingredients.map((ingredient: any) => ({
              id: ingredient.id,
              name: ingredient.name,
              measurement: ingredient.measurement,
              stock: ingredient.stock,
              minimumStock: ingredient.minimumStock,
              unitPrice: ingredient.unitPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }),
              createdAt: new Date(ingredient.createdAt).toLocaleDateString(
                'pt-BR'
              ),
            }));
            this.paginacao.totalItem = response.data.totalItems;
          }
        },
        error: (error) => {
          console.error('Erro ao buscar os ingredientes:', error);
        },
        complete: () => {
          this.isLoading = false;
          if (showSuccessModal) {
            this.handleSuccessModal();
          }
        },
      });
  }

  getPaginacao(event: any): void {
    this.paginacao.pageNumber = event.pageNumber;
    this.paginacao.pageSize = event.pageSize;
    this.fetchIngredients(false);
  }

  openModal(isEdit: boolean = false, product?: any): void {
    this.isEditMode = isEdit;
    this.isModalVisible = true;

    if (isEdit && product) {
      this.selectedProduct = { ...product };
      this.productId = product.id;
      console.log('Produto selecionado para edição:', this.selectedProduct);
      console.log('ID do produto:', this.productId);
    } else {
      this.resetSelectedProduct();
    }
  }

  handleSuccessModal(): void {
    this.modalSuccess = true;
    this.titulo = 'Sucesso!';
    this.subTitulo = this.isEditMode
      ? 'Produto atualizado com sucesso!'
      : 'Produto cadastrado com sucesso!';
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  openDeleteModal(id: string): void {}

  onProductSaved(): void {
    this.showSuccessModal = true;
    this.fetchIngredients(true);
  }

  private resetSelectedProduct(): void {
    this.selectedProduct = {
      nome: '',
      unidadeMedida: '',
      quantidade: null,
      quantidadeMinima: null,
      precoUnitario: null,
      dataEntrada: '',
    };
    this.productId = '';
  }
}
