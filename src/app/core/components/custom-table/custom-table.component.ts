import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements AfterViewInit {
  @Input() columns: Array<{
    header: string;
    field: string;
    sortable?: boolean;
    width?: string;
    isSelect?: boolean;
    selectOptions?: Array<{ value: any; label: string }>;
    specialStyle?: string;
    blockStyle?: boolean;
  }> = [];
  @Input() lastChildPosition?: boolean;
  @Input() data: Array<any> = [];
  @Input() noDataMessage: string = 'Nenhum dado encontrado.';
  @Input() actions: Array<{
    icon?: string;
    action: (item: any) => void;
    text?: string;
  }> = [];
  @Input() hasBorder: boolean = false;
  @Input() centerCell: boolean = false;
  @Input() hasBolderCell: boolean = false;
  @Input() minWidth: string = '';
  @Input() highlightBlockedFields: Array<string> = [];
  @Input() useSelectForFields: Array<string> = [];
  @Output() sortChange = new EventEmitter<string>();
  @Output() selectChange = new EventEmitter<{ field: string; item: any }>();
  @Input() disabled: boolean = false;
  @Input() seeMore: boolean = false;

  @ViewChild('tableContainer') tableContainer!: ElementRef;

  isDragging = false;
  startX = 0;
  scrollLeft = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const tableElement = this.tableContainer.nativeElement;
    this.updateCursorBasedOnScroll(tableElement);
    tableElement.addEventListener('mousedown', (e: MouseEvent) =>
      this.onMouseDown(e)
    );
    tableElement.addEventListener('mousemove', (e: MouseEvent) =>
      this.onMouseMove(e)
    );
    tableElement.addEventListener('mouseleave', () => this.onMouseLeave());
    document.addEventListener('mouseup', () => this.onMouseUp());
    window.addEventListener('resize', () =>
      this.updateCursorBasedOnScroll(tableElement)
    );
  }

  updateCursorBasedOnScroll(tableElement: HTMLElement) {
    if (tableElement.scrollWidth > tableElement.clientWidth) {
      this.renderer.setStyle(tableElement, 'cursor', 'grab');
    } else {
      this.renderer.setStyle(tableElement, 'cursor', 'default');
    }
  }

  onMouseDown(e: MouseEvent) {
    const tableElement = this.tableContainer.nativeElement;
    if (tableElement.scrollWidth > tableElement.clientWidth) {
      this.isDragging = true;
      this.startX = e.pageX - tableElement.offsetLeft;
      this.scrollLeft = tableElement.scrollLeft;
      this.renderer.setStyle(tableElement, 'cursor', 'grabbing');
      this.renderer.setStyle(document.body, 'user-select', 'none');
    }
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    e.preventDefault();
    const tableElement = this.tableContainer.nativeElement;
    const x = e.pageX - tableElement.offsetLeft;
    const walk = (x - this.startX) * 0.5;
    tableElement.scrollLeft = this.scrollLeft - walk;
  }

  onMouseUp() {
    const tableElement = this.tableContainer.nativeElement;
    this.isDragging = false;
    this.updateCursorBasedOnScroll(tableElement);
    this.renderer.setStyle(document.body, 'user-select', 'auto');
  }

  onMouseLeave() {
    const tableElement = this.tableContainer.nativeElement;
    this.isDragging = false;
    this.updateCursorBasedOnScroll(tableElement);
    this.renderer.setStyle(document.body, 'user-select', 'auto');
  }

  onSort(field: string) {
    this.sortChange.emit(field);
  }

  getClasses(column: any, item: any) {
    const classes: { [key: string]: boolean } = {
      hasBolderCell: this.hasBolderCell,
      hasBorder: this.hasBorder,
      centerCell: this.centerCell,
    };
  
    if (column.field === 'stock' && item.stock < item.minimumStock) {
      classes[column.specialStyle] = true;
    }
  
    return classes;
  }
  

  isBlockedField(column: any): boolean {
    return this.highlightBlockedFields.includes(column.field);
  }

  isFieldSelectable(field: string): boolean {
    return this.useSelectForFields.includes(field);
  }
}
