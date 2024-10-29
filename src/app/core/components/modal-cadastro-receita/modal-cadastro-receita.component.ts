import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-cadastro-receita',
  templateUrl: './modal-cadastro-receita.component.html',
  styleUrls: ['./modal-cadastro-receita.component.scss'],
})
export class ModalCadastroReceitaComponent {
  @Input() isVisible = false;
  @Input() isEditMode = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();

  recipe = {
    nome: '',
    ingredientes: [{ id: null, quantidade: null }],
  };

  ingredientOptions: { value: number; label: string }[] = [
    { value: 1, label: 'Sugar' },
    { value: 2, label: 'Flour' },
    { value: 3, label: 'Butter' },
  ];

  addIngredient(): void {
    this.recipe.ingredientes.push({ id: null, quantidade: null });
  }

  removeIngredient(index: number): void {
    this.recipe.ingredientes.splice(index, 1);
  }

  closeModal(): void {
    this.onClose.emit();
  }

  save(form: any): void {
    if (form.valid) {
      this.onSave.emit(this.recipe);
    }
  }
}
