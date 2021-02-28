
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { MatDialog} from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Login, LoginSuccess } from './login.model';
import { Router } from '@angular/router';
import { ValidatorsService } from '../HelperServices/validators.service';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar , MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


import { AuthService } from '../guards/auth.service';
import { config } from '@fullcalendar/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phide = false; // Show/Hide Password
  loginForm;
  errorMessage;
  visible = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
   mconfig = new MatSnackBarConfig();
  private onDestroy$: Subject<void> = new Subject<void>();
  // Initilize Required services into Condtructor
  // tslint:disable-next-line: max-line-length
  constructor(private validatorsService: ValidatorsService, private loginService: LoginService, public dialog: MatDialog, private router: Router, private cookieService: CookieService, private auth: AuthService, private snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, this.validatorsService.emailValidator]),
      password: new FormControl('', [Validators.required, this.validatorsService.passwordValidator])
    });
  }
  // Initialization Method
  ngOnInit() {

    if (this.auth.validateUserSession()) {
      this.router.navigateByUrl('/home');
      this.visible = false;
    } else {
      this.router.navigateByUrl('/login');
      this.visible = true;
    }

    this.mconfig.verticalPosition = this.verticalPosition;
    this.mconfig.horizontalPosition = this.horizontalPosition;
    this.mconfig.duration = 2000;

  }
  // Forgot Password Method
  forgotPwdMethod(): void {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '350px',
      data: { name: 'test' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  /*Login Submission*/
  onSubmitLogin() {
    if (this.loginForm.valid) {
      const obj = new Login(this.loginForm.value);
      this.loginService.login(obj).pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {

        const successData = new LoginSuccess(data);
        if (successData.code === 200) {
          this.auth.setTokenAndUserDetails(successData);
          this.auth.setCookeService();
          this.router.navigateByUrl('/home');
        } else {
          this.snackBar.open(successData.message, '', {
            duration: 2000,
          });
        }
      }, error => {
        const failureData = new LoginSuccess(error.error);
        this.errorMessage = failureData.message;
        this.snackBar.open(this.errorMessage , '', this.mconfig);
      });

    }
  }
   /*Error messages*/
  getErrorMessage(controlName: string) {
    return this.loginForm.controls[controlName].hasError('required') ? 'You must enter a value' :
      this.loginForm.controls[controlName].hasError('invalidEmailAddress') ? 'Invalid email address' :
        this.loginForm.controls[controlName].hasError('invalidPassword') ? 'Invalid password. Password must contain a number' : '';;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
