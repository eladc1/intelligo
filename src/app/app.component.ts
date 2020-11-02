import {Component} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public loading = false;

    constructor(private router: Router) {
        this.router.events.subscribe((routerEvent) => {
            this.checkRouterEvent(routerEvent);
        });
    }


    // This idea came from:
    // https://www.youtube.com/watch?v=LaIAHOSKHCQ&feature=emb_title&t=552
    private checkRouterEvent(routerEvent): void {
        if (routerEvent instanceof NavigationStart) {
            this.loading = true;
        }

        if (routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
            this.loading = false;
        }
    }
}
