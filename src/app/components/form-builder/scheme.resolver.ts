import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {FormBuilderService} from './form-builder.service';


// This idea came from:
// https://www.youtube.com/watch?v=LaIAHOSKHCQ&feature=emb_title&t=343

@Injectable({
    providedIn: 'root'
})
export class SchemeResolver implements Resolve<any> {
    constructor(private fbService: FormBuilderService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Response> {
        const schemeType = route.paramMap.get('schemeType');
        return this.fbService.getScheme(schemeType);
    }
}
