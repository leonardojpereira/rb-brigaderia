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
  modalError: boolean = false;
  titulo: string = '';
  subTitulo: string = '';
  showSuccessModal: boolean = false;
  isDeleteModalOpen = false;
  successAction: 'cadastrar' | 'editar' | 'deletar' = 'cadastrar';

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.fetchIngredients(false);
    this.resetSelectedProduct();
  }

  fetchIngredients(showSuccessModal: boolean = false): void {
    this.isLoading = true;
    this.ingredientService
      .getIngredients(this.paginacao.pageNumber, this.paginacao.pageSize)
      .pipe(delay(500))
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
            this.handleSuccessModal(this.successAction);
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
      this.successAction = 'editar';
    } else {
      this.resetSelectedProduct();
      this.successAction = 'cadastrar';
    }
  }

  handleSuccessModal(action: 'cadastrar' | 'editar' | 'deletar'): void {
    this.modalSuccess = true;
    this.titulo = 'Sucesso!';
    this.subTitulo =
      action === 'cadastrar'
        ? 'Produto cadastrado com sucesso!'
        : action === 'editar'
        ? 'Produto atualizado com sucesso!'
        : 'Produto deletado com sucesso!';
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

  openDeleteModal(id: string): void {
    this.productId = id;
    this.isDeleteModalOpen = true;
  }

  deleteProduct(): void {
    this.isLoading = true;
    this.successAction = 'deletar';
    this.ingredientService.deleteProduct(this.productId).subscribe({
      next: () => {
        this.fetchIngredients(true);
        this.isDeleteModalOpen = false;
      },
      error: (error) => {
        console.error('Erro ao deletar o produto:', error);
        this.handleErrorModal('Erro ao deletar o produto.');
      },
    });
  }

  onProductSaved(): void {
    this.isLoading = true;
    this.successAction = this.isEditMode ? 'editar' : 'cadastrar';
    this.fetchIngredients(true);
  }

  onError(message: string): void {
    this.handleErrorModal(message);
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

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }
}
