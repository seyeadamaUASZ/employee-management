import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedState } from 'src/app/shared/helpers/shared.state';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
    public show!: Subject<boolean>;

    constructor(private sharedState: SharedState) {}

    ngOnInit(): void {
        this.show = this.sharedState.getIsLoading();
    }
}

