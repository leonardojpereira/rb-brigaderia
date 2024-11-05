import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracoes-page',
  templateUrl: './configuracoes-page.component.html',
  styleUrl: './configuracoes-page.component.scss'
})
export class ConfiguracoesPageComponent {
  filter: string = '';
  filterTimeout: any;
  isEditMode: boolean = false;
  isModalVisible: boolean = false;
  selectedProduct: any;
  productId: any;
  successAction: string = '';
  onFilterChange(filterValue: string): void {
    this.filter = filterValue;

    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    // this.filterTimeout = setTimeout(() => {
    //   this.fetchUsuarios(false);
    // }, 500);
  }

  openModal(isEdit: boolean = false, product?: any): void {
    this.isEditMode = isEdit;
    this.isModalVisible = true;

    if (isEdit && product) {
      this.selectedProduct = { ...product };
      this.productId = product.id;
      this.successAction = 'editar';
    } else {
      this.resetSelectedProduct();
      this.successAction = 'cadastrar';
    }
  }
  resetSelectedProduct() {
    throw new Error('Method not implemented.');
  }
}
