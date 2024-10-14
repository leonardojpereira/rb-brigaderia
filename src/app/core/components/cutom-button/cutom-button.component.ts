import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cutom-button',
  templateUrl: './cutom-button.component.html',
  styleUrl: './cutom-button.component.scss'
})
export class CutomButtonComponent  implements OnInit{
  ngOnInit(): void {
  }
  @Input() type: string = 'button';
  @Input() text: string = '';
}
