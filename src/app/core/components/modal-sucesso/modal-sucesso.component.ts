import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-sucesso',
  templateUrl: './modal-sucesso.component.html',
  styleUrl: './modal-sucesso.component.scss'
})
export class ModalSucessoComponent implements OnInit {
  @Input() title: string = ''
  @Input() subTitle: string = ''
  @Input() openModal: boolean = false;
  @Output() closeModal = new EventEmitter();
  ngOnInit(): void {
  }
  close(){
    this.closeModal.emit(false);
  }
}
