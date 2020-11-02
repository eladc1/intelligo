import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormBuilderService} from './form-builder.service';
import {SchemaOption} from '../../types';
import {ActivatedRoute, Router} from '@angular/router';
import {FormSelectionService} from '../form-sellction/form-selection.service';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
    public genericFormGroup: FormGroup;
    public formScheme: Array<SchemaOption>;
    public flatScheme: Array<SchemaOption>;
    public displayFormType: string;
    private formType: string;

    constructor(private fb: FormBuilder,
                private fbService: FormBuilderService,
                private formSelectSrv: FormSelectionService,
                private route: ActivatedRoute,
                private dialog: MatDialog,
                private router: Router) {
    }

    ngOnInit(): void {
        this.formScheme = this.route.snapshot.data.schemeTypes?.scheme;
        this.formType = this.route.snapshot.data.schemeTypes?.type;
        this.displayFormType = this.formSelectSrv.schemeDictionary[this.formType];
        this.flatScheme = this.formScheme.flat(Infinity);
        this.genericFormGroup = this.generateFormControl(this.flatScheme);
    }

    public async send(): Promise<void> {
        if (this.genericFormGroup.valid) {
            try {
                await this.formSelectSrv.sendForm(this.formType, this.genericFormGroup.value);
                const dialogRef = this.dialog.open(DialogComponent, {
                    data: {
                        type: 'success',
                        title: 'Yay, you made it!',
                        message: 'Your form with all your important info has sent to the server successfully 🥳.'
                    }
                });

                dialogRef.afterClosed().subscribe(() => {
                    this.router.navigate(['/']);
                });
            } catch {
                this.dialog.open(DialogComponent, {
                    data: {
                        type: 'error',
                        title: 'Oh no',
                        message: 'Sorry, there was an error in the server, please try later.'
                    }
                });
            }
        }
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
