import {Component, OnInit, Inject, NgZone} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data, private ngZone: NgZone) {
    }

    ngOnInit(): void {
    }

    onCloseClick(): void {
        // from https://stackoverflow.com/a/59502797/8253018
        this.ngZone.run(() => {
            this.dialogRef.close();
        });
    }
}
