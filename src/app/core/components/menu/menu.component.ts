import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() isMenuExpanded: boolean = false;

  constructor(private router: Router) {}

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigate(route: string) {
    if (route) {
      this.isDropdownOpen = false; 
      this.router.navigate([route]);
    }
  }
}
