import {ElementRef, Directive} from 'angular2/angular2';
import {Renderer} from 'angular2/src/render/api';
import {ControlDirective} from './control_directive';
import {ControlValueAccessor} from './control_value_accessor';

/**
 * The accessor for writing a value and listening to changes that is used by a
 * {@link Control} directive.
 *
 * This is the default strategy that Angular uses when no other accessor is applied.
 *
 *  # Example
 *  ```
 *  <input type="text" [ng-control]="loginControl">
 *  ```
 *
 * @exportedAs angular2/forms
 */
@Directive({
  selector: 'select[ng-control],select[ng-form-control],select[ng-model]',
  hostListeners: {
    'change': 'onChange($event.target.value)',
    'input': 'onChange($event.target.value)',
    'blur': 'onTouched()'
  },
  hostProperties: {'value': 'value'}
})
export class SelectControlValueAccessor implements ControlValueAccessor {
  value = null;
  onChange: Function;
  onTouched: Function;

  constructor(cd: ControlDirective, private _elementRef: ElementRef, private _renderer: Renderer) {
    this.onChange = (_) => {};
    this.onTouched = (_) => {};
    this.value = '';
    cd.valueAccessor = this;
  }

  writeValue(value) {
    this._renderer.setElementProperty(this._elementRef.parentView.render,
                                      this._elementRef.boundElementIndex, 'value', value)
  }

  registerOnChange(fn): void { this.onChange = fn; }
  registerOnTouched(fn): void { this.onTouched = fn; }
}