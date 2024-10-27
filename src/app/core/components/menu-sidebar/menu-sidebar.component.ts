import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
  animations: [
    trigger('delayedDisplay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('50ms 230ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MenuSidebarComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  
  @Input() isMenuExpanded: boolean = false;
  isLogoutModalOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

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
}
