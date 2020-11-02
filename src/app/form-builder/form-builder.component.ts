import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormBuilderService} from './form-builder.service';
import {SchemaOption} from '../types';

@Component({
    selector: 'app-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
    public genericFormGroup: FormGroup;
    public formScheme: Array<SchemaOption>;
    public flatScheme: Array<SchemaOption>;
    public formType: string;

    constructor(private fb: FormBuilder, private fbService: FormBuilderService) {
    }

    ngOnInit(): void {
        this.formType = this.fbService.currentFormType;

        this.formScheme = this.fbService.currentScheme;
        this.flatScheme = this.formScheme.flat(Infinity);
        this.genericFormGroup = this.generateFormControl(this.flatScheme);

    }

    public log(val): void {
        console.log(val);
    }

    public send(): void {
        console.log(this.genericFormGroup.value);
    }

    private generateFormControl(scheme): FormGroup {
        const formGroupKeys = {};
        scheme.forEach((item) => {
            const fieldVal = item.value || null;
            formGroupKeys[item.key] = item.require ? [fieldVal, Validators.required] : fieldVal;
        });
        return this.fb.group(formGroupKeys);
    }
}
