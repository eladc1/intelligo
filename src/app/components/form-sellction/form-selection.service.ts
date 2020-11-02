import {Injectable} from '@angular/core';
import {KeyValue, TypeOfSchema} from '../../types';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class FormSelectionService {
    public schemeListCache: TypeOfSchema[];
    public schemeDictionary: KeyValue;

    constructor(private http: HttpClient, private dialog: MatDialog) {
    }

    public async sendForm(type: string, data: any): Promise<any> {
        const reqBody = {
            type,
            form: data
        };
        return this.http.post(`${environment.schemeApiUrl}/schemas/submit`, reqBody).toPromise();
    }

    public async getSchemesList(): Promise<TypeOfSchema[]> {
        if (this.schemeListCache) {
            return Promise.resolve(this.schemeListCache);
        }
        const result: any = await this.http.get(`${environment.schemeApiUrl}/schemas/list`)
            .toPromise().catch(() => {
                this.dialog.open(DialogComponent, {
                    data: {
                        type: 'error',
                        message: 'Sorry, failed to load the optional scheme list, please try later.'
                    }
                });
            });
        this.schemeListCache = result.result.schemasList;

        this.schemeDictionary = this.convertSchemeToDictionary(this.schemeListCache);
        return this.schemeListCache;
    }

    private convertSchemeToDictionary(schemeList): KeyValue {
        const dictionary = {};
        schemeList.forEach(i => dictionary[i.type] = i.display);
        return dictionary;
    }
}
