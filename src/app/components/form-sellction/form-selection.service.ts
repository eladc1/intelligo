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

    constructor(private http: HttpClient, private dialog: MatDialog ) {
    }

    public async getSchemesList(): Promise<TypeOfSchema[]> {
        if (this.schemeListCache) {
            return  Promise.resolve(this.schemeListCache);
        }
        const result: any = await this.http.get(`${environment.schemeApiUrl}/schemas/list`)
            .toPromise().catch( err => {
                this.dialog.open(DialogComponent, {
                    data: {
                        type: 'error',
                        message: 'Sorry, failed to load the optional scheme list, please try later.'
                    }
                });
            });
        this.schemeDictionary = this.cleanSchemeListAsDictionary(result.result.schemasList);
        this.schemeListCache = result.result.schemasList;
        return result.result.schemasList;
    }

    private cleanSchemeListAsDictionary(schemeList): KeyValue{
        const dictionary = {};
        schemeList.forEach(i => dictionary[i.type] = i.display);
        return dictionary;
    }
}
