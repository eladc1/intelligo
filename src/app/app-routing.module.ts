import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormBuilderComponent} from './components/form-builder/form-builder.component';
import {FormSelectionComponent} from './components/form-sellction/form-selection.component';
import {SchemeResolver} from './components/form-builder/scheme.resolver';
import {SchemeSelectionResolver} from './components/form-sellction/scheme-selection.resolver';

const appRoutes: Routes = [
    {
        path: 'form/:schemeType',
        resolve: {
            availableSchemes: SchemeSelectionResolver,
            schemeTypes: SchemeResolver
        },
        component: FormBuilderComponent
    },
    {
        path: '',
        resolve: {availableSchemes: SchemeSelectionResolver},
        component: FormSelectionComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
