import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() buttonText: string = '';
  @Input() placeholder: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isButtonVisible: boolean = true;
  @Input() isSearchFilterVisible: boolean = true;
  @Input() isDateFilterVisible: boolean = false;
  @Input() isUniqueDate: boolean = false;
  @Input() isSelectFilterVisible: boolean = false;
  @Input() isMonthFilterVisible: boolean = false; 
  @Input() selectOptions: { value: string; label: string }[] = [{ value: '', label: '' }];
  @Input() monthOptions: { value: number | null; label: string }[] = []; 
  @Input() yearOptions: { value: number | null; label: string }[] = []; 

  @Output() buttonClick = new EventEmitter<void>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() dataInicialChange = new EventEmitter<string>();
  @Output() dataFinalChange = new EventEmitter<string>();
  @Output() monthChange = new EventEmitter<number>(); 
  @Output() yearChange = new EventEmitter<number>();

  selectedMonth: number | null = null;
  selectedYear: number | null = null;

  ngOnInit(): void {
    this.generateMonthOptions();
    this.generateYearOptions();
    this.selectedMonth = null; 
    this.selectedYear = null;
    this.emitInitialFilters();

  }

  onButtonClick(): void {
    this.buttonClick.emit();
  }

  onFilterInputChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterChange.emit(filterValue);
  }

  onSelectChange(event: string): void {
    this.filterChange.emit(event);
  }

  onDataInicialChange(event: Event): void {
    const dataInicial = (event.target as HTMLInputElement).value;
    this.dataInicialChange.emit(dataInicial);
  }

  onDataFinalChange(event: Event): void {
    const dataFinal = (event.target as HTMLInputElement).value;
    this.dataFinalChange.emit(dataFinal);
  }

  generateYearOptions(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    this.yearOptions = [{ label: 'Todos', value: null }]; 
  
    for (let year = startYear; year <= currentYear; year++) {
      this.yearOptions.push({ label: year.toString(), value: year });
    }
  }

  generateMonthOptions(): void {
    this.monthOptions = [
      { label: 'Todos', value: null }, 
      { label: 'Janeiro', value: 1 },
      { label: 'Fevereiro', value: 2 },
      { label: 'Março', value: 3 },
      { label: 'Abril', value: 4 },
      { label: 'Maio', value: 5 },
      { label: 'Junho', value: 6 },
      { label: 'Julho', value: 7 },
      { label: 'Agosto', value: 8 },
      { label: 'Setembro', value: 9 },
      { label: 'Outubro', value: 10 },
      { label: 'Novembro', value: 11 },
      { label: 'Dezembro', value: 12 },
    ];
  }

  emitInitialFilters(): void {
    if (this.selectedMonth) {
      this.monthChange.emit(this.selectedMonth);
    }
    if (this.selectedYear) {
      this.yearChange.emit(this.selectedYear);
    }
  }

  onMonthChange(month: number | null): void {
    this.selectedMonth = month;
    this.monthChange.emit(month ?? undefined);
  }
  
  onYearChange(year: number | null): void {
    this.selectedYear = year;
    this.yearChange.emit(year ?? undefined);
  }
}
