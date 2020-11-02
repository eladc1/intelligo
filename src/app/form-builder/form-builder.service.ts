import {Injectable} from '@angular/core';
// @ts-ignore
import Scheme from './schema.json';
import {isObject as _isObject} from 'lodash';
import {HttpClient} from '@angular/common/http';
import {SchemaOption} from '../types';

@Injectable({
    providedIn: 'root'
})
export class FormBuilderService {
    public currentScheme = [];
    public currentFormType = '';

    constructor(private http: HttpClient) {
        this.currentScheme = this.cleanSchema(Scheme.result.scheme);
        this.currentFormType = Scheme.result.type;
    }

    private cleanSchema(dirtyScheme, indent = 0): SchemaOption[] {
        const cleanScheme = [];

        Object.keys(dirtyScheme).forEach((key) => {
            if (_isObject(dirtyScheme[key])) {
                const result = this.cleanSchema(dirtyScheme[key], indent + 1);
                result[0].ui.title = key;
                cleanScheme.push(result);
            } else {
                const fieldObj: SchemaOption = JSON.parse(dirtyScheme[key]);
                fieldObj.key = key;
                fieldObj.type = fieldObj.type.toLowerCase();
                fieldObj.ui = {
                    indent,
                    isInput: ['string', 'date', 'number', 'boolean'].includes(fieldObj.type)
                };
                cleanScheme.push(fieldObj);
            }
        });
        return cleanScheme;
    }
}
