import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-estoque-page',
  templateUrl: './estoque-page.component.html',
  styleUrls: ['./estoque-page.component.scss']
})
export class EstoquePageComponent implements OnInit {

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

  estoque: any[] = [];

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.fetchIngredients();
  }

  fetchIngredients(): void {
    this.ingredientService.getIngredients().subscribe({
      next: (response) => {
        if (response.isSuccess && response.data?.ingredients) {
          this.estoque = response.data.ingredients.map((ingredient: any) => ({
            name: ingredient.name,
            measurement: ingredient.measurement,
            stock: ingredient.stock,
            minimumStock: ingredient.minimumStock,
            unitPrice: ingredient.unitPrice,
          }));
        }
      },
      error: (error) => {
        console.error('Erro ao buscar os ingredientes:', error);
      }
    });
  }


  openModal(isEdit: boolean = false, ingredient?: any): void {
  }

  openDeleteModal(id: string): void {
  }
}
