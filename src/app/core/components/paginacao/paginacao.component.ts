import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { IPaginacaoModel } from '../../models/IPaginacaoModel';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrl: './paginacao.component.scss',
})
export class PaginacaoComponent extends MatPaginatorIntl implements OnInit {
  currentPage = 1;
  totalPages = 10;
  override itemsPerPageLabel = 'Itens por página';
  override nextPageLabel = 'Próxima página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primeira página';
  override lastPageLabel = 'Última página';
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    const startIndex = page * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, length);
    return `${startIndex} – ${endIndex} de ${length}`;
  };

  @Input() paginacao: IPaginacaoModel = {
    pageNumber: 1,
    pageSize: 8,
  };

  @Output() valuePagination = new EventEmitter();

  ngOnInit(): void {}

  constructor() {
    super();
  }

  getPage(event: any) {
    const emit: IPaginacaoModel = {
      pageNumber: event.pageIndex + 1,
      pageSize: event.pageSize,
    };
    this.valuePagination.emit(emit);
  }

  onPageChange(event: any) {
    const newPage = Number(event.target.value);
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    } else {
      event.target.value = this.currentPage;
    }
  }
}
