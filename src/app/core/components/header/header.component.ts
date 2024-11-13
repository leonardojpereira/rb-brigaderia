import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() buttonText: string = '';
  @Output() buttonClick = new EventEmitter<void>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() dataInicialChange = new EventEmitter<string>();
  @Output() dataFinalChange = new EventEmitter<string>();
  @Input() placeholder: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isButtonVisible: boolean = true;
  @Input() isSearchFilterVisible: boolean = true;
  @Input() isDateFilterVisible: boolean = false;
  @Input() isUniqueDate: boolean = false;


  onButtonClick(): void {
    this.buttonClick.emit();
  }

  onFilterInputChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterChange.emit(filterValue);
  }

  onDataInicialChange(event: Event): void {
    const dataInicial = (event.target as HTMLInputElement).value;
    this.dataInicialChange.emit(dataInicial);
  }

  onDataFinalChange(event: Event): void {
    const dataFinal = (event.target as HTMLInputElement).value;
    this.dataFinalChange.emit(dataFinal);
  }
}
