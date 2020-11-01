import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isObject as _isObject} from 'lodash';
import {FormBuilderService} from './form-builder.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  public formControllers: FormGroup;
  public formScheme: unknown;
  public isObject = _isObject;

  constructor(private fb: FormBuilder, private fbService: FormBuilderService) {
  }

  ngOnInit(): void {
    this.formScheme = this.fbService.currentScheme;
    this.formControllers = this.generateFormControl(this.formScheme);

  }

  public log(val): void {
    console.log(val);
  }

  public send(): void {
    console.log(this.formControllers.value);
  }

  private generateFormControl(scheme): FormGroup {
    const formGroup = {};

    Object.keys(scheme).forEach((key) => {
      if (_isObject(scheme[key])) {
        formGroup[key] = this.generateFormControl(scheme[key]);
      } else {
        const fieldObj = JSON.parse(scheme[key]);
        const fieldVal = fieldObj.value || null;
        formGroup[key] = fieldObj.require ? [fieldVal, Validators.required] : fieldVal;
      }
    });
    return this.fb.group(formGroup);
  }
}
