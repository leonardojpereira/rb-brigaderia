import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  @Input() productionId: string | null = null;
  @Input() isDisabled: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onError = new EventEmitter<string>();

  productionOptions: { value: string; label: string }[] = [];

  producao = {
    receita: '',
    quantidade: 0,
  };
  isLoading: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private productionService: ProductionService
  ) {}

  ngOnInit(): void {
    this.loadRecipes();
    if (this.isEditMode && this.productionId) {
      this.loadProductionDetails();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productionId'] && this.isEditMode && this.productionId) {
      this.loadProductionDetails();
    }
  }

  loadProductionDetails(): void {
    this.productionService.getProductionById(this.productionId!).subscribe({
      next: (response) => {
        if (response.isSuccess && response.data.productions.length > 0) {
          const production = response.data.productions[0];
          this.producao.receita = production.receitaId;
          this.producao.quantidade = production.quantidadeProduzida;
        }
      },
      error: () => {
        this.onError.emit('Erro ao carregar produção');
      },
    });
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

      if (this.isEditMode && this.productionId) {
        this.productionService
          .updateProduction(this.productionId, productionData)
          .subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.onSave.emit(response.data);
                this.closeModal();
              } else {
                this.onError.emit('Erro ao atualizar produção');
              }
            },
            error: (httpErrorResponse) => {
              this.isLoading = false;
              if (
                httpErrorResponse.status === 400 &&
                httpErrorResponse.error &&
                httpErrorResponse.error.errors
              ) {
                this.onError.emit(httpErrorResponse.error.errors);
              } else {
                console.error('Erro inesperado:', httpErrorResponse);
              }
            },
          });
      } else {
        this.productionService.createProduction(productionData).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.onSave.emit(response.data);
              this.closeModal();
            } else {
              this.onError.emit('Erro ao salvar produção');
            }
          },
          error: (httpErrorResponse) => {
            this.isLoading = false;
            if (
              httpErrorResponse.status === 400 &&
              httpErrorResponse.error &&
              httpErrorResponse.error.errors
            ) {
              this.onError.emit(httpErrorResponse.error.errors);
            } else {
              console.error('Erro inesperado:', httpErrorResponse);
            }
          },
        });
      }
    }
  }
}
