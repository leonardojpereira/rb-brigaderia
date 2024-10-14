import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  ngOnInit(): void {}
}
