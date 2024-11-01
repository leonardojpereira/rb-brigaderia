import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ProductionService } from '../../../services/production.service';
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

  constructor(
    private recipeService: RecipeService,
    private productionService: ProductionService
  ) {}

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
      const now = new Date();
      const dataProducao = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, -1);

      const productionData = {
        receitaId: this.producao.receita,
        quantidadeProduzida: this.producao.quantidade,
        dataProducao,
      };

      this.productionService.createProduction(productionData).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.onSave.emit(response.data);
            this.closeModal();
          } else {
            this.onError.emit('Erro ao salvar produção');
          }
        },
        error: () => {
          this.onError.emit('Erro ao salvar produção');
        },
      });
    }
  }
}
