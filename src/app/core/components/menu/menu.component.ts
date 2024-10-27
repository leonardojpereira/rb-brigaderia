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

  navigate(route: string) {
    if (route) {
      this.router.navigate([route]);
    }
  }
}
