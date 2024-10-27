import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrl: './modal-confirmacao.component.scss'
})
export class ModalConfirmacaoComponent implements OnInit {
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() openModal: boolean = false;
  @Input() disabledButton: boolean = false;
  @Output() confirmar = new EventEmitter();
  @Output() cancelar = new EventEmitter();
  ngOnInit(): void {
  }
  closeModal(){
    this.cancelar.emit(false);
  }
  salvar(){
    this.confirmar.emit(false);
  }
}
