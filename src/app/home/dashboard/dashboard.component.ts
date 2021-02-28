import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard: boolean;
  selectedDate: any;
  onSelect(event) {
    console.log(event);
    this.dashboard = false;
    this.selectedDate = event;
    // tslint:disable-next-line: max-line-length
    this.router.navigate(['./events'], { queryParams: { name: event.toLocaleDateString() }, skipLocationChange: true, relativeTo: this.route });
  }
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dashboard = true;
  }
  onActivate(componentReference) {
    if (componentReference.eventsTabClosed) {
      componentReference.eventsTabClosed.subscribe((data) => {
        this.dashboard = true;
      });
    }
  }

}
