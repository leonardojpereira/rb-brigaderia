import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IngredientService } from '../../../services/ingredient.service';
import { RecipeService } from '../../../services/recipe.serivce';

@Component({
  selector: 'app-modal-cadastro-receita',
  templateUrl: './modal-cadastro-receita.component.html',
  styleUrls: ['./modal-cadastro-receita.component.scss'],
})
export class ModalCadastroReceitaComponent implements OnInit, OnChanges {
  @Input() isVisible = false;
  @Input() isEditMode = false;
  @Input() recipeId: string | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onError = new EventEmitter<string>();

  recipe = {
    nome: '',
    descricao: '',
    ingredientes: [{ id: null, quantidade: null }],
  };

  ingredientOptions: { value: string; label: string }[] = [];

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.loadIngredients();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && this.isVisible && this.isEditMode && this.recipeId) {
      this.loadRecipeById(this.recipeId);
    }
  }

  loadIngredients(): void {
    this.ingredientService.getIngredients(1, 100).subscribe({
      next: (response) => {
        if (response.isSuccess && response.data?.ingredients) {
          this.ingredientOptions = response.data.ingredients.map((ingredient: any) => ({
            value: ingredient.id,
            label: ingredient.name,
          }));
        }
      },
      error: (error) => {
        console.error('Error fetching ingredients:', error);
      },
    });
  }

  loadRecipeById(id: string): void {
    this.recipeService.getRecipeById(id).subscribe({
      next: (response) => {
        if (response.isSuccess && response.data?.recipe) {
          const recipeData = response.data.recipe; // Access recipe data correctly
          this.recipe.nome = recipeData.nome;
          this.recipe.descricao = recipeData.descricao;
          this.recipe.ingredientes = recipeData.ingredients.map((ingredient: any) => ({
            id: ingredient.ingredienteId,
            quantidade: ingredient.quantidadeNecessaria,
          }));
        }
      },
      error: (error) => {
        console.error('Error loading recipe:', error);
      },
    });
  }
  

  addIngredient(): void {
    this.recipe.ingredientes.push({ id: null, quantidade: null });
  }

  removeIngredient(index: number): void {
    this.recipe.ingredientes.splice(index, 1);
  }

  resetRecipe(): void {
    this.recipe = {
      nome: '',
      descricao: '',
      ingredientes: [{ id: null, quantidade: null }],
    };
  }

  closeModal(): void {
    this.onClose.emit();
    this.resetRecipe();
  }

  save(form: any): void {
    if (form.valid) {
      const payload = {
        nome: this.recipe.nome,
        descricao: this.recipe.descricao,
        ingredientes: this.recipe.ingredientes.map((ingredient) => ({
          ingredienteId: ingredient.id,
          quantidadeNecessaria: ingredient.quantidade,
        })),
      };

      if (this.isEditMode && this.recipeId) {
        this.recipeService.updateRecipe(this.recipeId, payload).subscribe({
          next: (response) => {
            this.onSave.emit(response);
            this.resetRecipe();
            this.closeModal();
          },
          error: () => {
            this.onError.emit('Erro ao atualizar a receita.');
          },
        });
      } else {
        this.recipeService.createRecipe(payload).subscribe({
          next: (response) => {
            this.onSave.emit(response);
            this.resetRecipe();
            this.closeModal();
          },
          error: () => {
            this.onError.emit('Erro ao criar a receita.');
          },
        });
      }
    }
  }
}
