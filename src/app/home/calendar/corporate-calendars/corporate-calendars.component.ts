import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router,ActivatedRoute } from '@angular/router';
export interface PeriodicElement {
  position: number;
  createdUser: string;
  calName: string;
  createdDateandTime: string;
  lastActivity: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,calName: "Calendar 1", createdUser: 'Alex', createdDateandTime: "10/22/2017  05:24", lastActivity: '1 Hour ago'},
  {position: 2,calName: "Calendar 2", createdUser: 'John', createdDateandTime: "10/23/2017 05:24", lastActivity: '2 Hours ago'},
  {position: 3,calName: "Calendar 3", createdUser: 'Vanessa', createdDateandTime: "10/23/2017 05:24", lastActivity: '3 Hours ago'},
  {position: 4,calName: "Calendar 4", createdUser: 'David', createdDateandTime: "10/23/2017 05:24", lastActivity: '3 Hours ago'},
  {position: 5,calName: "Calendar 5", createdUser: 'Miller', createdDateandTime: "10/23/2017 05:24", lastActivity: '8 Hours ago'},
  {position: 6,calName: "Calendar 6", createdUser: 'Arya', createdDateandTime: "10/23/2017 05:24", lastActivity: 'One day ago'},
  {position: 7,calName: "Calendar 7", createdUser: 'Medina', createdDateandTime: "10/23/2017 05:24", lastActivity: 'One day ago'},
  {position: 8,calName: "Calendar 8", createdUser: 'Watson', createdDateandTime: "10/23/2017 05:24", lastActivity: 'Two days ago'},
  {position: 9,calName: "Calendar 9", createdUser: 'Lewis', createdDateandTime: "10/23/2017 05:24", lastActivity: 'Two days ago'},
  {position: 10,calName: "Calendar 10", createdUser: 'Sansa', createdDateandTime:"10/23/2017 05:24", lastActivity: 'One week ago'},
];
@Component({
  selector: 'app-corporate-calendars',
  templateUrl: './corporate-calendars.component.html',
  styleUrls: ['./corporate-calendars.component.css']
})
export class CorporateCalendarsComponent implements OnInit {
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['select', 'calName', 'createdUser', 'createdDateandTime', 'lastActivity'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // selectedAll(){

  // }
  closeForm() {
    this.router.navigate(['../calendar'],{relativeTo: this.route });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
