import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { IPaginacaoModel } from '../../core/models/IPaginacaoModel';

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
    { header: 'Quantidade', field: 'stock' },
    { header: 'Quantidade mínima', field: 'minimumStock' },
    { header: 'Preço unitário', field: 'unitPrice' },
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

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.fetchIngredients();
    this.selectedProduct = {
      nome: '',
      unidadeMedida: '',
      quantidade: null,
      quantidadeMinima: null,
      precoUnitario: null,
      dataEntrada: '',
    };
  }

  fetchIngredients(): void {
    this.isLoading = true;
    this.ingredientService
      .getIngredients(this.paginacao.pageNumber, this.paginacao.pageSize)
      .subscribe({
        next: (response) => {
          if (response.isSuccess && response.data?.ingredients) {
            this.estoque = response.data.ingredients.map((ingredient: any) => ({
              name: ingredient.name,
              measurement: ingredient.measurement,
              stock: ingredient.stock,
              minimumStock: ingredient.minimumStock,
              unitPrice: ingredient.unitPrice,
            }));
            this.paginacao.totalItem = response.data.totalItems;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao buscar os ingredientes:', error);
          this.isLoading = false;
        },
      });
  }

  getPaginacao(event: any): void {
    this.paginacao.pageNumber = event.pageNumber;
    this.paginacao.pageSize = event.pageSize;
    this.fetchIngredients();
  }

  openModal(isEdit: boolean = false, product?: any): void {
    this.isEditMode = isEdit;
    this.isModalVisible = true;
    this.selectedProduct = product
      ? { ...product }
      : {
          nome: '',
          unidadeMedida: '',
          quantidade: null,
          quantidadeMinima: null,
          precoUnitario: null,
          dataEntrada: '',
        };
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  openDeleteModal(id: string): void {}

  onProductSaved(): void {
    this.fetchIngredients();
  }
}
