import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss'
})
export class CustomButtonComponent  implements OnInit{
  ngOnInit(): void {
  }
  @Input() type: string = 'button';
  @Input() text: string = '';
  @Input() isFirstAccessButton: boolean = false;
  @Input() isDisabled: boolean = false;
}
