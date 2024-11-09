import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { IPaginacaoModel } from '../../core/models/IPaginacaoModel';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-entrada-saida-page',
  templateUrl: './entrada-saida-page.component.html',
  styleUrls: ['./entrada-saida-page.component.scss'],
})
export class EntradaSaidaPageComponent implements OnInit {
  movimentacao: any[] = [];
  columns = [
    { field: 'ingredient', header: 'Produto', width: '40%' },
    { field: 'quantity', header: 'Quantidade', width: '20%' },
    { field: 'movementType', header: 'Tipo de movimentação', width: '20%' },
    { field: 'createdAt', header: 'Data da movimentação', width: '20%' },
  ];

  isLoading: boolean = false;
  paginacao: IPaginacaoModel = {
    pageNumber: 1,
    pageSize: 7,
    totalItem: 0,
  };

  dataInicial: string | undefined;
  dataFinal: string | undefined;

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.getStockMovements();
  }

  getStockMovements(): void {
    this.isLoading = true;
    this.ingredientService
      .getStockMovements(
        this.paginacao.pageNumber,
        this.paginacao.pageSize,
        this.dataInicial,
        this.dataFinal
      )
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.movimentacao = response.data.stockMovements.map(
              (movement: any) => ({
                ingredient: movement.ingredient,
                quantity: movement.quantity,
                movementType: movement.movementType,
                createdAt: new Date(movement.createdAt).toLocaleDateString(),
              })
            );
            this.paginacao.totalItem = response.data.totalRecords; 
          }
        },
        error: (error) =>
          console.error('Erro ao carregar movimentações de estoque:', error),
        complete: () => (this.isLoading = false),
      });
  }

  onDateInicialChange(date: string): void {
    this.dataInicial = date;
    this.getStockMovements();
  }

  onDateFinalChange(date: string): void {
    this.dataFinal = date;
    this.getStockMovements();
  }

  getPaginacao(event: any): void {
    this.paginacao.pageNumber = event.pageNumber;
    this.paginacao.pageSize = event.pageSize;
    this.getStockMovements();
  }
}
