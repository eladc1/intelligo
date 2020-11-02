import {Component, OnInit} from '@angular/core';
import {FormSelectionService} from './form-selection.service';
import {TypeOfSchema} from '../../types';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-form-selection',
    templateUrl: './form-selection.component.html',
    styleUrls: ['./form-selection.component.scss']
})
export class FormSelectionComponent implements OnInit {
    public availableSchemes: TypeOfSchema[];

    constructor(private formSelectSrv: FormSelectionService,  private route: ActivatedRoute) {
    }

    async ngOnInit(): Promise<void> {
        this.availableSchemes = this.route.snapshot.data.availableSchemes;
    }
}
