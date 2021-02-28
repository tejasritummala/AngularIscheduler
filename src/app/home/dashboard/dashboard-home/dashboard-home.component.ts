import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  selectedDate: any;

  // tslint:disable-next-line: max-line-length
  datesToHighlight = ['2019-01-22T18:30:00.000Z', '2019-01-22T18:30:00.000Z', '2019-01-24T18:30:00.000Z', '2019-01-28T18:30:00.000Z', '2019-01-24T18:30:00.000Z', '2019-01-23T18:30:00.000Z', '2019-01-22T18:30:00.000Z', '2019-01-25T18:30:00.000Z'];
  constructor() { }

  ngOnInit() {
  }
  onSelect(event) {
    console.log(event);
    this.selectedDate = event;
  }
  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datesToHighlight
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      return highlightDate ? 'special-date' : '';
    };
  }

}

