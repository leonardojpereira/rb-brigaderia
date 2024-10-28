import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.serivce';

@Component({
  selector: 'app-card-receitas-produzidas',
  templateUrl: './card-receitas-produzidas.component.html',
  styleUrls: ['./card-receitas-produzidas.component.scss'],
})
export class CardReceitasProduzidasComponent implements OnInit {
  receitas: { nome: string; quantidade: number; custo: number }[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.fetchTopProducedRecipes();
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

  // calculateCost(recipe: any): number {
  //   return recipe.custoTotal;
  // }
}
