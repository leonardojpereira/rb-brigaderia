import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../../services/ingredient.service';

@Component({
  selector: 'app-card-resumo-estoque-dashboard',
  templateUrl: './card-resumo-estoque-dashboard.component.html',
  styleUrls: ['./card-resumo-estoque-dashboard.component.scss'],
})
export class CardResumoEstoqueDashboardComponent implements OnInit {
  products: any[] = [];
  visibleProducts: any[] = [];

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.loadProductData();
  }

  loadProductData(): void {
    this.ingredientService.getAllIngredients().subscribe(
      (response) => {
        if (
          response.isSuccess &&
          response.data &&
          Array.isArray(response.data.ingredients)
        ) {
          this.products = response.data.ingredients
            .map((ingredient: any) => ({
              name: ingredient.name,
              quantity: ingredient.stock,
              status: this.getStatus(ingredient.stock, ingredient.minimumStock),
            }))
            .sort(
              (a: { quantity: number }, b: { quantity: number }) =>
                a.quantity - b.quantity
            ); // Sort by quantity in ascending order

          this.visibleProducts = this.products.slice(0, 4);
        } else {
          console.error('Unexpected API response format:', response);
        }
      },
      (error) => {
        console.error('Error loading ingredients:', error);
      }
    );
  }

  getStatus(stock: number, minimumStock: number): string {
    return stock > minimumStock ? 'Alto' : 'Baixo';
  }

  getStatusClass(status: string): string {
    return status === 'Alto' ? 'status-alto' : 'status-baixo';
  }
}
