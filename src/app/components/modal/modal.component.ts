import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Input() showDefaultButtons: boolean = true;
  @Input() title: string = '';
  @Input() saveButtonText: string = 'Confirmar';
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Input() isAlert: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() width: string = 'auto';
  @Input() noPadding: boolean = false;

  @Input() closeOnBackdropClick: boolean = true;

  close() {
    this.isVisible = false;
    this.onClose.emit();
  }

  save() {
    this.onSave.emit();
  }

  onBackdropClick() {
    if (this.closeOnBackdropClick) {
      this.close();
    }
  }
}
