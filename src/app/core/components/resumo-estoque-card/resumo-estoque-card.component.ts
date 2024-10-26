import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { IngredientService } from '../../../services/ingredient.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-resumo-estoque-card',
  templateUrl: './resumo-estoque-card.component.html',
  styleUrls: ['./resumo-estoque-card.component.scss'],
})
export class ResumoEstoqueCardComponent implements OnInit, OnDestroy {
  products: any[] = [];
  visibleProducts: any[] = [];
  displayCount: number = 4;
  carouselIndex: number = 0;
  carouselInterval: Subscription | undefined;

  constructor(
    private ingredientService: IngredientService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.checkWindowWidth();
    this.ingredientService.ingredients$.subscribe((ingredients) => {
      this.products = ingredients
        .map((ingredient: any) => ({
          name: ingredient.name,
          quantity: ingredient.stock,
          status: this.getStatus(ingredient.stock, ingredient.minimumStock),
        }))
        .sort((a, b) => a.quantity - b.quantity);

      this.updateVisibleProducts();
      this.setCarouselIndex(this.carouselIndex);
      if (this.products.length > 0 && !this.carouselInterval) {
        this.startCarousel();
      }
    });

    this.ingredientService.updateIngredientsList();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  startCarousel(): void {
    this.carouselInterval = interval(3000).subscribe(() => {
      this.carouselIndex = (this.carouselIndex + 1) % this.products.length;
      this.updateVisibleProducts();
      this.setCarouselIndex(this.carouselIndex);
    });
  }

  stopCarousel(): void {
    this.carouselInterval?.unsubscribe();
  }

  updateVisibleProducts(): void {
    const start = this.carouselIndex;
    const end = start + this.displayCount;

    this.visibleProducts = [
      ...this.products.slice(start, end),
      ...this.products.slice(0, Math.max(0, end - this.products.length)),
    ];
  }

  setCarouselIndex(index: number): void {
    this.renderer.setStyle(
      document.documentElement,
      '--carousel-index',
      index.toString()
    );
  }

  getStatus(stock: number, minimumStock: number): string {
    if (stock === 0) return 'Acabou';
    else if (stock <= minimumStock) return 'Pouco';
    else if (stock > minimumStock && stock < minimumStock * 3) return 'Médio';
    return 'Muito';
  }

  @HostListener('window:resize')
  checkWindowWidth(): void {
    this.displayCount = window.innerWidth <= 1625 ? 3 : 4;
    this.updateVisibleProducts();
  }
}
