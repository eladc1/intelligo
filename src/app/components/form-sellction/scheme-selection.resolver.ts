import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {FormSelectionService} from './form-selection.service';
import {TypeOfSchema} from '../../types';


// This idea came from:
// https://www.youtube.com/watch?v=LaIAHOSKHCQ&feature=emb_title&t=343

@Injectable({
    providedIn: 'root'
})
export class SchemeSelectionResolver implements Resolve<any> {
    constructor(private fsService: FormSelectionService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<TypeOfSchema[]> {
        return this.fsService.getSchemesList();
    }
}
