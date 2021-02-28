import { Component, OnInit , ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AddUser, AdduserResponse } from './add-user.model';
import { AddUserService } from './add-user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @ViewChild('externalForm', { static: false }) externalForm;
  @ViewChild('corporateForm', { static: false }) corporateForm;
  addexternalForm: FormGroup;
  addCorporateForm: FormGroup;
  isValidFormSubmitted = null;
  userdata;
  isAddUser = true;
  private onDestroy$: Subject<void> = new Subject<void>();
  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private location: Location, private adduserService: AddUserService) { }

  ngOnInit() {
    this.adduserService.currentMessage.subscribe(message => this.userdata = message);

    if (Object.keys(this.userdata).length) {
      this.isAddUser = false;
    }
    this.addexternalForm = this.formBuilder.group({
      users: this.formBuilder.array(
        [this.createUserFormGroup()],
        [Validators.required])
    });
    this.addCorporateForm = this.formBuilder.group({
      users: this.formBuilder.array(
        [this.createUserFormGroup()],
        [Validators.required])
    });

  }
  
  /** Creation of Form Array to add User */
  createUserFormGroup() {
    return this.formBuilder.group({
      firstname: [this.isAddUser ? '' : this.userdata.first_name, [Validators.required]],
      lastname: [this.isAddUser ? '' : this.userdata.last_name, [Validators.required]],
      email: [this.isAddUser ? '' : this.userdata.user_name, [Validators.required, Validators.email]],
    });
  }

  /** Creation of Form Array(Users) */
  get users(): FormArray {
    return this.addexternalForm.get('users') as FormArray;
  }
  get corpusers(): FormArray {
    return this.addCorporateForm.get('users') as FormArray;
  }
  /** Creation new user to Form Array(Users) */
   /** Creation new user to Form Array(Users) */
   addnewuser(type) {
    if (type === 'External') {
  
      if (this.users.value.length < 5) {
        const fg = this.createUserFormGroup();
        this.users.push(fg);
      }
    }
    if (type === 'Corporate') {
      if (this.corpusers.value.length < 5) {
        const fg = this.createUserFormGroup();
        this.corpusers.push(fg);
      }
    }
  }
  /** Deletion of Form Array(Users) */

   deleteuser(idx: number, type) {
    if (type === 'External') {
      this.users.removeAt(idx);
    }
    if (type === 'Corporate') {
      this.corpusers.removeAt(idx);
    }
  }
  /** Submission of form array */
  onFormSubmit(value) {
    debugger
    let form;
    let externalUsers;
    if (value === 'External') {
      form = this.addexternalForm;
      externalUsers = new AddUser(this.addexternalForm.value , 'external');
    } else {
      form = this.addCorporateForm;
      externalUsers = new AddUser(this.addCorporateForm.value , 'corporate');
    }



    if (form.valid) {
      this.isValidFormSubmitted = true;
      // const externalUsers = new AddUser(this.teamForm.value);
      if (this.isAddUser) {
        this.adduserService.addUser(externalUsers).pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {
          const successData = new AdduserResponse(data);
          if (successData.code === 200) {
            this.resetForm(value);
            this.snackBar.open(successData.message, '', {
              duration: 2000,
            });
          } else {
            this.snackBar.open(successData.message, '', {
              duration: 2000,
            });
          }
        }, error => {
          const failData = new AdduserResponse(error.error);
          this.snackBar.open(failData.message, '', {
            duration: 2000,
          });
        });
      } else {
        this.adduserService.updateUser(externalUsers, this.userdata.user_id).pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {
          const successData = new AdduserResponse(data);
          if (successData.code === 200) {
            this.snackBar.open(successData.message, '', {
              duration: 2000,
            });
          } else {
            this.snackBar.open(successData.message, '', {
              duration: 2000,
            });
          }
        }, error => {
          const failData = new AdduserResponse(error.error);
          this.snackBar.open(failData.message, '', {
            duration: 2000,
          });
        });

      }

    } else {
      this.isValidFormSubmitted = false;
      this.snackBar.open('Enter required fields', '', {
        duration: 2000,
      });
      if (form.invalid) {
        return;
      }
    }

  }

  resetForm(usrType) {
    var arr;
    var form;
    if (usrType === 'External') {
      arr = this.users;
      form = this.externalForm;
    } else {
      arr = this.corpusers;
      form = this.corporateForm;
    } 
    arr.clear();
    const fg = this.createUserFormGroup();
    arr.push(fg);
    form.resetForm();
  }



  /** cancellation of creation of users */
  onCancel() {
    this.router.navigate(['../userslist'], { relativeTo: this.route });
    //  this.location.back();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }

}
