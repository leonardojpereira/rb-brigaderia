import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portal-rb-brigaderia-front';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token || !this.validateToken(token)) {
      this.loginService.logout();
    }
  }

  validateToken(token: string): boolean {
    const segments = token.split('.');
    if (segments.length === 3) {
      try {
        const payload = JSON.parse(atob(segments[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp && payload.exp > now;
      } catch (error) {
        console.error('Erro ao validar token:', error);
        return false;
      }
    }
    return false;
  }
}
