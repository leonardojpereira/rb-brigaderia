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
    {
      header: 'Ingredientes',
      field: 'ingredientes',
      specialStyle: 'ingredients-list',
    },
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
  private filterTimeout: any;
  modalSuccess: boolean = false;
  modalError: boolean = false;
  titulo: string = '';
  subTitulo: string = '';
  showSuccessModal: boolean = false;
  role: string = '';
  isDisabled: boolean = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.fetchRecipes();
    this.getPermissao();
  }

  getPermissao(): void {
    this.role = localStorage.getItem('role') || '';
    if(this.role === 'User') {
     this.isDisabled = true;
     return;
    }
 }

  fetchRecipes(): void {
    this.isLoading = true;
    this.recipeService
      .getAllRecipes(
        this.paginacao.pageNumber,
        this.paginacao.pageSize,
        this.filter
      )
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
              ingredientes: recipe.ingredientes
                .map((i: any) => `${i.nome} (${i.quantidadeNecessaria})`)
                .join(', '),
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

    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.fetchRecipes();
    }, 500);
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
      this.recipeId = recipe.id;
    } else {
      this.resetSelectedRecipe();
    }
  }

  openDeleteModal(id: string): void {
    this.recipeId = id;
    this.isDeleteModalOpen = true;
  }

  private resetSelectedRecipe(): void {
    this.selectedRecipe = {
      nome: '',
      descricao: '',
      custoTotal: null,
      ingredientes: [],
    };
    this.recipeId = '';
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  onRecipeSaved(recipeData: any): void {
    console.log('Recipe saved:', recipeData);
    this.isModalVisible = false;
    this.fetchRecipes();
    this.handleSuccessModal();
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  handleSuccessModal(): void {
    this.modalSuccess = true;
    this.titulo = 'Sucesso!';
    this.subTitulo = this.isEditMode
      ? 'Receita atualizada com sucesso!'
      : 'Receita cadastrada com sucesso!';
  }

  handleDeleteSuccessModal(): void {
    this.modalSuccess = true;
    this.titulo = 'Sucesso!';
    this.subTitulo = 'Receita deletada com sucesso!';
  }

  handleErrorModal(message: string): void {
    this.modalError = true;
    this.titulo = 'Erro!';
    this.subTitulo = message;
  }

  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipeId).subscribe({
      next: () => {
        this.recipeService.notifyRecipesUpdated();
        this.isDeleteModalOpen = false;
        this.fetchRecipes();
        this.handleDeleteSuccessModal();
      },
      error: (httpErrorResponse) => {
        this.isLoading = false;
        if (
          httpErrorResponse.status === 400 &&
          httpErrorResponse.error &&
          httpErrorResponse.error.errors
        ) {
          this.handleErrorModal(httpErrorResponse.error.errors);
        } else {
          console.error('Erro inesperado:', httpErrorResponse);
        }
      },
    });
  }
}
