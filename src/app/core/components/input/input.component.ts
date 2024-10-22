import {
  Component,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() width: string = '100%';
  @Input() mobileWidth: string = '100%';
  @Input() mask: string = '';
  @Input() label?: string;
  @Input() boldLabel?: boolean = false;
  @Input() readonly: boolean = false;
  isPassword: boolean = false;

  private currentWidth!: string;

  @HostBinding('style.width') get getWidth() {
    return this.currentWidth;
  }
  private innerValue: string = '';

  get value(): string {
    return this.innerValue;
  }

  set value(val: string) {
    this.innerValue = val;
    this.onChange(val);
    this.onTouched();
  }

  ngOnInit(): void {
    this.isPassword = this.type === 'password';
    this.updateWidth(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    const target = event.target as Window;
    this.updateWidth(target.innerWidth);
  }

  private updateWidth(windowWidth: number) {
    this.currentWidth = windowWidth <= 900 ? this.mobileWidth : this.width;
  }

  getInputType(): string {
    return this.isPassword
      ? this.isPasswordVisible
        ? 'text'
        : 'password'
      : this.type;
  }

  isPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onInputChange(event: any) {
    this.value = event.target.value;
  }
}
