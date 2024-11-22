import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() isMenuExpanded: boolean = false;
  activeDropdown: string | null = null;


  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isMenuExpanded'] && !changes['isMenuExpanded'].currentValue) {
      this.resetDropdowns(); 
    }
  }

  toggleDropdown(menu: string): void {
    if (!this.isMenuExpanded) {
      return; 
    }
    this.activeDropdown = this.activeDropdown === menu ? null : menu;
  }
  

  isDropdownOpen(menu: string): boolean {
    return this.activeDropdown === menu;
  }

  navigate(route: string): void {
    this.activeDropdown = null;
    this.router.navigate([route]);
  }

  resetDropdowns(): void {
    this.activeDropdown = null;
  }
}
