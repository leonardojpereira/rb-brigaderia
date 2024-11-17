import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
})
export class MenuSidebarComponent implements OnInit {
  @Input() isMenuExpanded: boolean = false;
  isLogoutModalOpen: boolean = false;
  menuLogo: string = 'assets/logo_brigaderia.png'; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateLogo();
    const observer = new MutationObserver(() => this.updateLogo());
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  updateLogo(): void {
    const isDarkMode = document.body.classList.contains('dark-theme');
    this.menuLogo = isDarkMode ? 'assets/logo_brigaderia_dark_mode.png' : 'assets/logo_brigaderia.png';
  }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  openLogoutModal() {
    this.isLogoutModalOpen = true;
  }

  closeLogoutModal() {
    this.isLogoutModalOpen = false;
  }

  confirmLogout() {
    this.closeLogoutModal();
    this.router.navigate(['/']);
    localStorage.clear();
  }

  navigate(route: string) {
    if (route) {
      this.router.navigate([route]);
    }
  }
}
