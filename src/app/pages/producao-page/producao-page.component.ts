import { Component, OnInit } from '@angular/core';
import { ProductionService } from '../../services/production.service';
import { IPaginacaoModel } from '../../core/models/IPaginacaoModel';

@Component({
  selector: 'app-producao-page',
  templateUrl: './producao-page.component.html',
  styleUrls: ['./producao-page.component.scss'],
})
export class ProducaoPageComponent implements OnInit {
  columns = [
    { header: 'Receita', field: 'nomeReceita', width: '50%' },
    { header: 'Quantidade de produções', field: 'quantidadeProduzida' },
    { header: 'Data da produção', field: 'dataProducao' },
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
  isEditMode: boolean = false;
  isModalVisible: boolean = false;
  productionId: string = '';
  filter: string = '';
  filterTimeout: any;
  isDeleteModalOpen: boolean = false;
  producoes: any[] = [];
  isLoading = false;
  paginacao: IPaginacaoModel = {
    pageNumber: 1,
    pageSize: 7,
    totalItem: 0,
  };

  constructor(private productionService: ProductionService) {}

  ngOnInit(): void {
    this.fetchProductions();
  }

  fetchProductions(): void {
    this.isLoading = true;
    this.productionService
      .getAllProductions(this.paginacao.pageNumber, this.paginacao.pageSize, this.filter)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.producoes = response.data.productions.map((production: any) => {
              const dataProducao = new Date(production.dataProducao);
              return {
                ...production,
                dataProducao: `${dataProducao.toLocaleDateString('pt-BR')} - ${dataProducao.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}`,
              };
            });
            this.paginacao.totalItem = response.data.totalRecords;
          }
        },
        error: (error) => console.error('Erro ao buscar produções:', error),
        complete: () => (this.isLoading = false),
      });
  }

  openModal(isEdit: boolean = false, production?: any): void {
    this.isEditMode = isEdit;
    this.isModalVisible = true;
    this.productionId = isEdit && production ? production.id : '';
  }

  onFilterChange(filterValue: string): void {
    this.filter = filterValue;
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }
    this.filterTimeout = setTimeout(() => {
      this.fetchProductions();
    }, 500);
  }

  openDeleteModal(id: string): void {
    this.productionId = id;
    this.isDeleteModalOpen = true;
  }


  getPaginacao(event: any): void {
    this.paginacao.pageNumber = event.pageNumber;
    this.paginacao.pageSize = event.pageSize;
    this.fetchProductions();
  }
}
