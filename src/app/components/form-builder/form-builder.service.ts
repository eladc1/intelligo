import {Injectable} from '@angular/core';
import {isObject as _isObject} from 'lodash';
import {HttpClient} from '@angular/common/http';
import {SchemaOption, SchemaOptionsReq} from '../../types';

@Injectable({
    providedIn: 'root'
})
export class FormBuilderService {
    public currentScheme = [];
    public currentFormType = '';

    constructor(private http: HttpClient) {}

    public async getScheme(schemeType: string): Promise<any> {
        const response = await this.http.get<SchemaOptionsReq>(`https://clarityapi.intelligo.ai/api/v1/schemas/${schemeType}`).toPromise();
        this.currentScheme = this.cleanSchema(response.result.scheme);
        this.currentFormType = response.result.type;
        return {scheme: this.currentScheme, type: response.result.type};
    }

    private cleanSchema(dirtyScheme, indent = 0): SchemaOption[] {
        const cleanScheme = [];

        Object.keys(dirtyScheme).forEach((key) => {
            if (_isObject(dirtyScheme[key])) {
                const result = this.cleanSchema(dirtyScheme[key], indent + 1);
                if (result[0].ui) {
                    result[0].ui.title = key;
                } else {
                    result[0].ui = {title: key};
                }
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
