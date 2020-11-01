import {Injectable} from '@angular/core';
// @ts-ignore
import Scheme from './schema.json';
import {isObject as _isObject} from 'lodash';
import {HttpClient} from '@angular/common/http';

interface SchemaOption {
    key: string;
    value: string | boolean;
    type: string;
    enumValues?: string[];
    require?: boolean;

    ui?: {
        isInput?: boolean;
        indent?: number;
        title?: string;
    };
}

@Injectable({
    providedIn: 'root'
})
export class FormBuilderService {
    public currentScheme = [];

    constructor(private http: HttpClient) {
        this.currentScheme = this.cleanSchema(Scheme.result.scheme);
    }

    private cleanSchema(dirtyScheme, indent = 0): SchemaOption[] {
        const cleanScheme = [];

        Object.keys(dirtyScheme).forEach((key) => {
            if (_isObject(dirtyScheme[key])) {
                const result = this.cleanSchema(dirtyScheme[key], indent + 1);
                result[0].ui = {
                    title: key
                };
                cleanScheme.push(result);
            } else {
                const fieldObj: SchemaOption = JSON.parse(dirtyScheme[key]);
                fieldObj.key = key;
                fieldObj.type = fieldObj.type.toLowerCase();
                fieldObj.ui = {
                    indent,
                    isInput: ['string', 'date', 'number'].includes(fieldObj.type)
                };
                cleanScheme.push(fieldObj);
            }
        });
        return cleanScheme;
    }
}
