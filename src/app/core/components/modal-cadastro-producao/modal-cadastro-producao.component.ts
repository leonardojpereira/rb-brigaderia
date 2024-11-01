import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.serivce';

@Component({
  selector: 'app-modal-cadastro-producao',
  templateUrl: './modal-cadastro-producao.component.html',
  styleUrls: ['./modal-cadastro-producao.component.scss'],
})
export class ModalCadastroProducaoComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() isEditMode: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();
  @Input() productionId: string | null = null;
  @Output() onError = new EventEmitter<string>();

  productionOptions: { value: string; label: string }[] = [];

  producao = {
    receita: '',
    quantidade: 0,
  };

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes(1, 100).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.productionOptions = response.data.recipes.map((recipe: any) => ({
            value: recipe.id,
            label: recipe.nome,
          }));
        }
      },
      error: () => {
        this.onError.emit('Erro ao carregar receitas');
      },
    });
  }

  closeModal(): void {
    this.onClose.emit();
  }

  save(form: any): void {
    if (form.valid) {
      this.onSave.emit(this.producao);
    }
  }
}
