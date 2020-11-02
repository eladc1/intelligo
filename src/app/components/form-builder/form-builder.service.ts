import {Injectable} from '@angular/core';
import {isObject as _isObject} from 'lodash';
import {HttpClient} from '@angular/common/http';
import {SchemaOption, SchemaOptionsReq, TypeOfSchema} from '../../types';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FormBuilderService {
    public currentScheme = [];
    public currentFormType = '';
    public schemesCache = {};

    constructor(private http: HttpClient) {
    }

    public async getScheme(schemeType: string): Promise<any> {
        if (this.schemesCache[schemeType]) {
            return Promise.resolve(this.schemesCache[schemeType]);
        }
        const response = await this.http.get<SchemaOptionsReq>(`${environment.schemeApiUrl}/schemas/${schemeType}`).toPromise();
        this.currentScheme = this.cleanSchema(response.result.scheme);
        this.currentFormType = response.result.type;

        this.schemesCache[schemeType] = {scheme: this.currentScheme, type: response.result.type};

        return this.schemesCache[schemeType];
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
