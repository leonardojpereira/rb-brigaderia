import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-modal-cadastro-usuario',
  templateUrl: './modal-cadastro-usuario.component.html',
  styleUrls: ['./modal-cadastro-usuario.component.scss'],
})
export class ModalCadastroUsuarioComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() isEditMode: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  @Output() onError = new EventEmitter<string>();

  user = {
    nome: '',
    email: '',
    role: '',
    senha: '',
  };
  roleOptions: Array<{ label: string, value: string }> = [];
  isLoading = false;
  modalError: boolean = false;
  titulo: string = '';
  subTitulo: string = '';

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getAllRoles().pipe(
      catchError((error) => {
        console.error('Erro ao carregar roles:', error);
        return of([]);
      })
    ).subscribe((response: any) => {
      if (response.isSuccess && response.data && response.data.roles) {
        this.roleOptions = response.data.roles.map((role: any) => ({
          label: role.name,
          value: role.id
        }));
      }
    });
  }

  save(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;
      this.onSave.emit();
      this.closeModal();
    } else {
      this.markFormFieldsAsTouched(form);
    }
  }

  closeModal(): void {
    this.isVisible = false;
    this.onClose.emit();
  }

  markFormFieldsAsTouched(form: NgForm): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
  }
}
