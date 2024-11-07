import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { IPaginacaoModel } from '../../core/models/IPaginacaoModel';
import { delay } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-configuracoes-page',
  templateUrl: './configuracoes-page.component.html',
  styleUrls: ['./configuracoes-page.component.scss'],
})
export class ConfiguracoesPageComponent implements OnInit {
  columns = [
    { header: 'Nome', field: 'nome', width: '40%' },
    { header: 'Email', field: 'email', width: '40%' },
    { header: 'Perfil', field: 'role' },
  ];
  actions = [
    {
      icon: 'edit',
      action: (item: any) => this.openModal(true, item),
    },
    {
      icon: 'delete',
      action: (item: any) => this.openDeleteModal(item.id),
    },
  ];
  isEditMode: boolean = false;
  isModalVisible: boolean = false;
  userId: string = '';
  filter: string = '';
  private filterTimeout: any;
  isDeleteModalOpen: boolean = false;
  usuarios: any[] = [];
  isLoading = false;
  paginacao: IPaginacaoModel = {
    pageNumber: 1,
    pageSize: 10,
    totalItem: 0,
  };
  modalError: boolean = false;
  subTitulo: string = '';
  titulo: string = '';
  modalSuccess: boolean = false;
  user: { nome: any; email: any; role: any; senha: string } = {
    nome: '',
    email: '',
    role: '',
    senha: '',
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  fetchUsuarios(): void {
    this.isLoading = true;
    this.usuarioService
      .getUsuarios(
        this.paginacao.pageNumber,
        this.paginacao.pageSize,
        this.filter
      )
      .pipe(delay(500))
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.usuarios = response.data.users;
            this.paginacao.totalItem = response.data.totalItems;
          }
        },
        error: (error) => console.error('Erro ao buscar usuários:', error),
        complete: () => (this.isLoading = false),
      });
  }

  openModal(isEdit: boolean = false, user?: any): void {
    this.isEditMode = isEdit;
    this.isModalVisible = true;

    if (isEdit && user) {
      this.userId = user.id;
      this.user = {
        nome: user.nome,
        email: user.email,
        role: user.role,
        senha: '',
      };
    } else {
      this.userId = '';
      this.user = { nome: '', email: '', role: '', senha: '' };
    }
  }

  onFilterChange(filterValue: string): void {
    this.filter = filterValue;

    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.fetchUsuarios();
    }, 1000);
  }

  handleErrorModal(message: string): void {
    this.modalError = true;
    this.titulo = 'Erro!';
    this.subTitulo = message;
  }

  onUserSaved(userData: any): void {
    this.isModalVisible = false;
    this.fetchUsuarios();
    this.handleSuccessModal();
  }

  handleSuccessModal(): void {
    this.modalSuccess = true;
    this.titulo = 'Sucesso!';
    this.subTitulo = this.isEditMode
      ? 'Usuário atualizado com sucesso!'
      : 'Usuário cadastrado com sucesso!';
  }

  handleDeleteSuccessModal(): void {
    this.modalSuccess = true;
    this.titulo = 'Sucesso!';
    this.subTitulo = 'Usuário deletado com sucesso!';
  }

  openDeleteModal(id: string): void {
    this.userId = id;
    this.isDeleteModalOpen = true;
  }

  // confirmDelete(): void {
  //   this.isLoading = true;
  //   if (this.userId) {
  //     this.loginService.deleteUser(this.userId).subscribe({
  //       next: (response) => {
  //         this.isLoading = false;
  //         if (response.isSuccess) {
  //           this.handleDeleteSuccessModal();
  //           this.fetchUsuarios();
  //         } else {
  //           this.handleErrorModal('Erro ao deletar usuário');
  //         }
  //       },
  //       error: (httpErrorResponse) => {
  //         this.isLoading = false;
  //         if (
  //           httpErrorResponse.status === 400 &&
  //           httpErrorResponse.error &&
  //           httpErrorResponse.error.errors
  //         ) {
  //           this.handleErrorModal(httpErrorResponse.error.errors);
  //         } else {
  //           console.error('Erro inesperado:', httpErrorResponse);
  //         }
  //       },
  //     });
  //   }
  //   this.isDeleteModalOpen = false;
  // }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  getPaginacao(event: any): void {
    this.paginacao.pageNumber = event.pageNumber;
    this.paginacao.pageSize = event.pageSize;
    this.fetchUsuarios();
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
