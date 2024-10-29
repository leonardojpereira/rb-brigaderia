import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() options: { value: any; label: string }[] = [];
  @Input() placeholder: string = '';
  @Input() value: any;
  @Input() required: boolean = false;
  @Input() disabledButton: boolean = false;
  @Input() width: string = '100%';
  @Input() height: string = '16px';
  @Input() noBorder: boolean = false;
  @Input() disabled: boolean = false;  
  

  @Output() valueChange = new EventEmitter<any>();

  @HostBinding('style.width') get getWidth() {
    return this.width;
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChangeValue(value: any) {
    this.value = value;
    this.valueChange.emit(value);
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }
}
