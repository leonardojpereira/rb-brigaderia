import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-erro',
  templateUrl: './modal-erro.component.html',
  styleUrl: './modal-erro.component.scss'
})
export class ModalErroComponent {
  @Input() title: string = ''
  @Input() subTitle: string = ''
  @Input() openModal: boolean = false;
  @Output() closeModal = new EventEmitter();

  close(){
    this.closeModal.emit(false);
  }

}
