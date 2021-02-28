import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPassword, ForgotPasswordResponse } from './forgot-password.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPwdForm;
  errorMessage;
  private onDestroy$: Subject<void> = new Subject<void>();
  // tslint:disable-next-line: max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ForgotPasswordComponent> , private dialog: MatDialog, private forgotService: ForgotPasswordService, private snackBar: MatSnackBar) {
    this.forgotPwdForm = new FormGroup({
      emailid: new FormControl('', [Validators.required, Validators.email])
    });
  }
  ngOnInit() {
  }
  getErrorMessage(controlName: string) {
    return this.forgotPwdForm.controls[controlName].hasError('required') ? 'You must enter a value' :
      this.forgotPwdForm.controls[controlName].hasError('email') ? 'Please enter valid email' : '';
  }
  /*onsentMailLink for Forgot password*/ 
  onsentMailLink() {
    if (this.forgotPwdForm.valid) {
      const obj = new ForgotPassword(this.forgotPwdForm.value);
      this.forgotService.forgot(obj).pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {

        const successData = new ForgotPasswordResponse(data);
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
        const failureData = new ForgotPasswordResponse(error.error);
        this.errorMessage = failureData.message;
        this.snackBar.open(this.errorMessage, '', {
          duration: 2000,
        });
      });

    }
    }
    // tslint:disable-next-line: use-lifecycle-interface
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }

}
