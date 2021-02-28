import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard-events',
  templateUrl: './dashboard-events.component.html',
  styleUrls: ['./dashboard-events.component.css']
})
export class DashboardEventsComponent implements OnInit {
  date;
  events = [
    {
      eventName: "Event name One",
      eventTime: "05:27",
      calName:"Calendar 1"
    }, {
      eventName: "Event name Two",
      eventTime: "08:27",
      calName:"Calendar 2"
    },{
      eventName: "Event name Three",
      eventTime: "09:30",
      calName:"Calendar 2"
    }
  ]
  @Output() eventsTabClosed: EventEmitter<any> = new EventEmitter(); 
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    debugger;
    this.route.queryParams.subscribe(queryParams => {
      this.date = queryParams.name;
      if (!this.date) {
        this.router.navigateByUrl('/home');       
      }
    });
  }
  closeForm() {
    this.router.navigate(['./home']);
    this.eventsTabClosed.emit();
  }

}
