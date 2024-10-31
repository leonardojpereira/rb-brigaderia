import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../../../services/recipe.serivce';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-receitas-produzidas',
  templateUrl: './card-receitas-produzidas.component.html',
  styleUrls: ['./card-receitas-produzidas.component.scss'],
})
export class CardReceitasProduzidasComponent implements OnInit, OnDestroy {
  receitas: { nome: string; quantidade: number; custo: number }[] = [];
  private recipesSubscription: Subscription | undefined;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.fetchTopProducedRecipes();

    this.recipesSubscription = this.recipeService.recipes$.subscribe(
      (recipes) => {
        this.receitas = recipes.map((recipe: any) => ({
          nome: recipe.nome,
          quantidade: recipe.totalProduzido,
          custo: recipe.custoTotal,
        }));
      }
    );
  }

  fetchTopProducedRecipes(): void {
    this.recipeService.getTopProducedRecipes().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.receitas = response.data.topProducedRecipes.map(
            (recipe: any) => ({
              nome: recipe.nome,
              quantidade: recipe.totalProduzido,
              custo: recipe.custoTotal,
            })
          );
        }
      },
      error: (error) =>
        console.error('Erro ao buscar as receitas mais produzidas:', error),
    });
  }

  ngOnDestroy(): void {
    this.recipesSubscription?.unsubscribe();
  }
}
