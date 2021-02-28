import { Component } from '@angular/core';
import { Event as RouterEvent } from '@angular/router';
import { Router } from '@angular/router';
import { RouteConfigLoadEnd } from '@angular/router';
import { RouteConfigLoadStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IScheduler';
  isShowingRouteLoadIndicator;
  asyncLoadCount = 0;



  constructor( router: Router ) {

    this.isShowingRouteLoadIndicator = false;

    router.events.subscribe(
        ( event: RouterEvent ): void => {

            if ( event instanceof RouteConfigLoadStart ) {

                this.asyncLoadCount++;

            } else if ( event instanceof RouteConfigLoadEnd ) {

                this.asyncLoadCount--;

            }
            this.isShowingRouteLoadIndicator = !! this.asyncLoadCount;

        }
    );

}








}
