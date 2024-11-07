import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RoleService } from '../../../services/role.service';
import { UsuarioService } from '../../../services/usuario.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-modal-cadastro-usuario',
  templateUrl: './modal-cadastro-usuario.component.html',
  styleUrls: ['./modal-cadastro-usuario.component.scss'],
})
export class ModalCadastroUsuarioComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() userId: string | null = null;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  @Output() onError = new EventEmitter<string>();

  user = {
    nome: '',
    username: '',
    email: '',
    role: '',
    senha: '',
  };
  roleOptions: Array<{ label: string; value: string }> = [];
  isLoading = false;
  modalError: boolean = false;
  titulo: string = '';
  subTitulo: string = '';

  constructor(
    private roleService: RoleService,
    private usuarioService: UsuarioService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && this.isVisible && !this.isEditMode) {
      this.user = { nome: '', username: '', email: '', role: '', senha: '' };
    }
  
    if (this.isEditMode && this.userId) {
      this.loadRoles();
      this.loadUserData(this.userId);
    }
  }
  

  loadRoles(): void {
    this.roleService
      .getAllRoles()
      .pipe(
        catchError((error) => {
          console.error('Erro ao carregar roles:', error);
          return of([]);
        })
      )
      .subscribe((response: any) => {
        if (response.isSuccess && response.data && response.data.roles) {
          this.roleOptions = response.data.roles.map((role: any) => ({
            label: role.name,
            value: role.id,
          }));
        }
      });
  }

  loadUserData(id: string): void {
    this.usuarioService
      .getUsuarioById(id)
      .pipe(
        catchError((error) => {
          console.error('Erro ao carregar usuário:', error);
          this.handleError('Erro ao carregar usuário.');
          return of(null);
        })
      )
      .subscribe((response: any) => {
        if (
          response &&
          response.isSuccess &&
          response.data &&
          response.data.user
        ) {
          const userData = response.data.user;
          this.user.nome = userData.nome;
          this.user.email = userData.email;
          this.user.role = userData.roleId;
        } else {
          this.handleError('Erro ao carregar dados do usuário.');
        }
      });
  }

  save(form: NgForm): void {
    if (form.valid) {
      this.isLoading = true;
      const userData = {
        nome: this.user.nome,
        username: this.user.email,
        email: this.user.email,
        roleId: this.user.role,
        password: this.user.senha,
      };

      if (this.isEditMode && this.userId) {
        this.usuarioService.updateUsuario(this.userId, userData).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.onSave.emit();
              this.closeModal();
            } else {
              this.handleError(
                response.message || 'Erro ao atualizar usuário.'
              );
            }
          },
          error: (error) => {
            console.error('Erro ao atualizar usuário:', error);
            this.handleError('Erro ao atualizar usuário.');
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      } else {
        this.loginService.registerUser(userData).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.onSave.emit();
              this.closeModal();
            } else {
              this.handleError(
                response.message || 'Erro ao cadastrar usuário.'
              );
            }
          },
          error: (error) => {
            console.error('Erro ao cadastrar usuário:', error);
            this.handleError('Erro ao cadastrar usuário.');
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      }
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

  private handleError(message: string): void {
    this.modalError = true;
    this.titulo = 'Erro!';
    this.subTitulo = message;
  }
}
