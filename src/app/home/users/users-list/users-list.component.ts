import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort, MatTableDataSource, PageEvent, MatPaginator, MatSort } from '@angular/material';
import { UsersList, UserListResponse, UserIdsInput , SendInvitationInput } from './users-list.model';
import { UsersListService } from './users-list.service';
import { AddUserService } from '../add-user/add-user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})


export class UsersListComponent implements OnInit {
  resultsLength = 0;
  private onDestroy$: Subject<void> = new Subject<void>();
  public dataSource = new MatTableDataSource<UsersList>();
  displayedColumns: string[] = ['select', 'first_name', 'user_name', 'user_type', 'status', 'invited_date', 'joined_date', 'actions'];
  selection = new SelectionModel<UsersList>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  message;

  // sorting , filtering and pagination variables
  sortValues: any = { sort_by: 'first_name', order_by: 'asc' };
  // sortValues: any = { sort_by: '', order_by: '' };
  index = 0;
  limit = 10;
  filtervalue = '';
  usertype  = 'All';

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private userslistService: UsersListService, private adduserService: AddUserService) { }

  ngOnInit() {
    this.getUserList();
  }

  changeSelection(row) {
    setTimeout(() => {
      this.selection.toggle(row);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
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

  // Multiple deletion of selected rows in table
  multipledelete() {
    // var selecteddata = this.selection.selected;
    // for (var i = 0; i < selecteddata.length; i++) {
    //   this.dataSource.data = this.dataSource.data.filter((value, key) => {
    //     return value.position !== selecteddata[i].position;
    //   });
    // }

  }

  /** Navigate to adduser  */
  addUser() {
    this.adduserService.changeMessage({});
    this.router.navigate(['../adduser'], { relativeTo: this.route });
  }
  /** Navigate to editUser  */
  editUser(user) {
    this.adduserService.changeMessage(user);
    this.router.navigate(['../adduser'],  { relativeTo: this.route});
  }

  /** Navigate to ImportUser  */
  importUser() {
    this.router.navigate(['../importuser'], { relativeTo: this.route });
  }

  /** Server sorting   */
  sortData(sort: Sort) {
    this.sortValues.order_by = sort.direction;
    this.sortValues.sort_by = sort.active;
    this.getUserList();
  }

  /** Server filtering   */
  applyFilter(filterValue: string) {
    this.filtervalue = filterValue;
    this.getUserList();
  }

  /** Server pagination   */
  pageEvent(pageEvents: PageEvent) {
    this.index = pageEvents.pageIndex * pageEvents.pageSize;
    this.limit = pageEvents.pageSize;
    this.getUserList();
  }
  /* delete user Button Event */
  deleteUser(user) {
    let selectedIds = this.selection.selected;
    if (user !== undefined) {
      selectedIds = [];
      selectedIds.push(user);
    }
    const userIds = new UserIdsInput(selectedIds);
    this.deleteUsers(userIds);
  }
  /* send invitation Button Event */
  sendInvitation(user) {
    let users = this.selection.selected;
    if (user !== undefined) {
      users = [];
      users.push(user);
    }
    const inviteUsers = new SendInvitationInput(users);
    this.userslistService.sentInvitation(inviteUsers).pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {
      const successData = new UserListResponse(data);
      if (successData.code === 200) {
        this.snackBar.open(successData.message ? successData.message : 'Invitation Sent Successfully', '', {
          duration: 2000,
        });
        this.selection.clear();
        this.getUserList();
      } else {
        this.snackBar.open(successData.message ? successData.message : 'Check your internet Settings', '', {
          duration: 2000,
        });
      }
    }, error => {
      const failData = new UserListResponse(error.error);
      this.snackBar.open(failData.message ? failData.message : 'Please Check your internet settings', '', {
        duration: 2000,
      });
    });
  }

  /** Service call to Delete users   */
  deleteUsers(userIdsList) {
    this.userslistService.deleteUsers(userIdsList).pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {
      const successData = new UserListResponse(data);
      if (successData.code === 200) {
        this.snackBar.open(successData.message, '', {
          duration: 2000,
        });
        this.selection.clear();
        this.getUserList();
      } else {
        this.snackBar.open(successData.message, '', {
          duration: 2000,
        });
      }
    }, error => {
      const failData = new UserListResponse(error.error);
      this.snackBar.open(failData.message ? failData.message : 'Please Check your internet settings', '', {
        duration: 2000,
      });
    });

  }
   /** Service call to get users   */
  getUserList() {
    const searchReq = {
      index: this.index,
      limit: this.limit,
      sort_by: this.sortValues.sort_by,
      order_by: this.sortValues.order_by,
      search: this.filtervalue,
      user_type: this.usertype
    };
    const searchReqModel = new UsersList(searchReq);
    this.userslistService.getUsers(searchReqModel).pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {
      const successData = new UserListResponse(data);
      if (successData.code === 200) {

        this.resultsLength = successData.count;
        this.dataSource.data = successData.users;
        this.selection = new SelectionModel<UsersList>(true, []);
        // this.snackBar.open(successData.message, '', {
        //   duration: 2000,
        // });
      } else {
        this.snackBar.open(successData.message, '', {
          duration: 2000,
        });
      }
    }, error => {
      const failData = new UserListResponse(error.error);
      this.snackBar.open(failData.message ? failData.message : 'Please Check your internet settings', '', {
        duration: 2000,
      });
    });
  }
    // tslint:disable-next-line: use-lifecycle-interface
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
  radioChange(event) {
    this.usertype = event.value;
    this.getUserList();
  }

}
