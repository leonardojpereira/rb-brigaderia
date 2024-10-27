import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-receitas-produzidas',
  templateUrl: './card-receitas-produzidas.component.html',
  styleUrls: ['./card-receitas-produzidas.component.scss'],
})
export class CardReceitasProduzidasComponent implements OnInit {
  receitas = [
    { nome: 'Brigadeiro de Ninho', quantidade: 12, custo: 40.0 },
    { nome: 'Brigadeiro Tradicional', quantidade: 15, custo: 40.0 },
    { nome: 'Brigadeiro de Óreo', quantidade: 17, custo: 40.0 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
