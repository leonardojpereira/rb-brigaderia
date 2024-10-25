import { Component, HostListener, OnInit } from '@angular/core';
import { IngredientService } from '../../../services/ingredient.service';

@Component({
  selector: 'app-resumo-estoque-card',
  templateUrl: './resumo-estoque-card.component.html',
  styleUrls: ['./resumo-estoque-card.component.scss']
})
export class ResumoEstoqueCardComponent implements OnInit {
  products: any[] = [];
  displayCount: number = 4; 

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.checkWindowWidth(); 
    this.fetchIngredients();
  }

  fetchIngredients(): void {
    this.ingredientService.getAllIngredients().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.products = response.data.ingredients
            .map((ingredient: any) => ({
              name: ingredient.name,
              quantity: ingredient.stock,
              status: this.getStatus(ingredient.stock, ingredient.minimumStock)
            }))
            .sort((a: { quantity: number }, b: { quantity: number }) => a.quantity - b.quantity)
            .slice(0, this.displayCount);
        }
      },
      error: (error) => {
        console.error('Erro ao buscar os ingredientes:', error);
      }
    });
  }

  getStatus(stock: number, minimumStock: number): string {
    if (stock === 0) {
      return 'Acabou';
    } else if (stock <= minimumStock) {
      return 'Pouco';
    } else if (stock > minimumStock && stock < minimumStock * 3) {
      return 'Médio';
    } else {
      return 'Muito';
    }
  }
  

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkWindowWidth();
  }

  checkWindowWidth(): void {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1625) {
      this.displayCount = 3;
    } else {
      this.displayCount = 4; 
    }
    this.fetchIngredients(); 
  }
}
