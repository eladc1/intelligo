import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormBuilderComponent} from './components/form-builder/form-builder.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {HeaderComponent} from './layout/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppRoutingModule} from './app-routing.module';
import {FormSelectionComponent} from './components/form-sellction/form-selection.component';
import {SchemeResolver} from './components/form-builder/scheme.resolver';
import {LoaderComponent} from './components/loader/loader.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        FormBuilderComponent,
        HeaderComponent,
        FormSelectionComponent,
        LoaderComponent,
        DialogComponent
    ],
    imports: [
        NoopAnimationsModule,
        CommonModule,
        HttpClientModule,
        BrowserModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        NoopAnimationsModule,
        FormsModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent],
    providers: [SchemeResolver]
})
export class AppModule {
}
