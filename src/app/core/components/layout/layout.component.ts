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
  isDarkMode = false;

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }

  loadThemePreference(): void {
    const savedTheme = localStorage.getItem('isDarkMode');
    this.isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }


  currentDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    let formattedDate = date.toLocaleDateString('pt-BR', options);
  
    formattedDate = formattedDate.replace(
      /\b([a-záéíóúãõç]+)\b/gi,
      (word) => {
        if (word.toLowerCase() === 'de') return word.toLowerCase();
        if (word.toLowerCase() === 'feira') return 'feira'; // Mantém "feira" minúsculo
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    );
  
    return formattedDate;
  }
  
}
