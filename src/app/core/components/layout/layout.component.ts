import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  username: string = '';

  ngOnInit(): void {
    this.username = localStorage.getItem('nmUsuario') || '';
  }

  @Input() isDashboardPage: boolean = false;

  currentDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('pt-BR', options);
  }
}
