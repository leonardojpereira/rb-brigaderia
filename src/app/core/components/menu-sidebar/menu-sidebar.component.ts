import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

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

  isMenuExpanded: boolean = false;

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  constructor() {}

  ngOnInit() {}
}
 