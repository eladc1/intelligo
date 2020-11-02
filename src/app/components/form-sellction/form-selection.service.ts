import {Injectable} from '@angular/core';
import {KeyValue, TypeOfSchema} from '../../types';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FormSelectionService {
    public schemeListCache: TypeOfSchema[];
    public schemeDictionary: KeyValue;

    constructor(private http: HttpClient) {
    }

    public async getSchemesList(): Promise<TypeOfSchema[]> {
        if (this.schemeListCache) {
            return  Promise.resolve(this.schemeListCache);
        }
        const result: any = await this.http.get('https://clarityapi.intelligo.ai/api/v1/schemas/list').toPromise();
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
