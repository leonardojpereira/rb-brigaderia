import { Component, OnInit } from '@angular/core';
import { IPaginacaoModel } from '../../core/models/IPaginacaoModel';
import { delay } from 'rxjs/operators';
import { RecipeService } from '../../services/recipe.serivce';

@Component({
  selector: 'app-receita-page',
  templateUrl: './receita-page.component.html',
  styleUrls: ['./receita-page.component.scss'],
})
export class ReceitaPageComponent implements OnInit {
  paginacao: IPaginacaoModel = {
    pageNumber: 1,
    pageSize: 7,
    totalItem: 0,
  };

  columns = [
    { header: 'Receita', field: 'nome' },
    { header: 'Ingredientes', field: 'ingredientes', specialStyle: 'ingredients-list' },
    { header: 'Custo total', field: 'custoTotal', format: 'currency' },
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
  filter: string = '';
  receitas: any[] = [];
  isModalVisible: boolean = false;
  isEditMode: boolean = false;
  selectedRecipe: any = null;
  recipeId: string = '';
  isDeleteModalOpen = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes(): void {
    this.isLoading = true;
    this.recipeService
      .getAllRecipes()
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          if (response.isSuccess && response.data?.recipes) {
            this.receitas = response.data.recipes.map((recipe: any) => ({
              id: recipe.id,
              nome: recipe.nome,
              custoTotal: recipe.custoTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }),
              ingredientes: recipe.ingredientes.map((i: any) => i.nome).join(', '),
            }));
            this.paginacao.totalItem = response.data.totalItems;
          }
        },
        error: (error) => {
          console.error('Erro ao buscar as receitas:', error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  onFilterChange(filterValue: string): void {
    this.filter = filterValue;
    this.fetchRecipes();
  }

  getPaginacao(event: any): void {
    this.paginacao.pageNumber = event.pageNumber;
    this.paginacao.pageSize = event.pageSize;
    this.fetchRecipes();
  }

  openModal(isEdit: boolean = false, recipe?: any): void {
    this.isEditMode = isEdit;
    this.isModalVisible = true;
    if (isEdit && recipe) {
      this.selectedRecipe = { ...recipe };
      this.recipeId = recipe.id;
    } else {
      this.resetSelectedRecipe();
    }
  }

  openDeleteModal(id: string): void {
    this.recipeId = id;
    this.isDeleteModalOpen = true;
  }

  // deleteRecipe(): void {
  //   this.isLoading = true;
  //   this.recipeService.deleteRecipe(this.recipeId).subscribe({
  //     next: () => {
  //       this.fetchRecipes();
  //       this.isDeleteModalOpen = false;
  //     },
  //     error: (error) => {
  //       console.error('Erro ao deletar a receita:', error);
  //     },
  //   });
  // }

  private resetSelectedRecipe(): void {
    this.selectedRecipe = {
      nome: '',
      descricao: '',
      custoTotal: null,
      ingredientes: [],
    };
    this.recipeId = '';
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }
}
