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
  @Input() placeholder: string = '';

  onButtonClick(): void {
    this.buttonClick.emit();
  }

  onFilterInputChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterChange.emit(filterValue);
  }
}
