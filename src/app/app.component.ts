import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Logger } from './core/services/logger.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        if (environment.production) {
            Logger.enableProductionMode();
        }

        const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

        merge(onNavigationEnd)
            .pipe(
                map(() => {
                    let route = this.activatedRoute;
                    while (route.firstChild) {
                        route = route.firstChild;
                    }

                    return route;
                }),
                switchMap(route => route.data)
            )
            .subscribe(event => {
                const title = event['title'];
                if (title) {
                    this.titleService.setTitle(title);
                }
            });
    }
}
