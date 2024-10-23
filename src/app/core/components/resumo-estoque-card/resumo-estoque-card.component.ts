import { Component } from '@angular/core';

@Component({
  selector: 'app-resumo-estoque-card',
  templateUrl: './resumo-estoque-card.component.html',
  styleUrls: ['./resumo-estoque-card.component.scss']
})
export class ResumoEstoqueCardComponent {
  products = [
    { name: 'Leite condensado', quantity: 10, status: 'Pouco' },
    { name: 'Açúcar', quantity: 20, status: 'Médio' },
    { name: 'Farinha', quantity: 5, status: 'Pouco' },
    { name: 'Arroz', quantity: 15, status: 'Muito' },
  ];
}
