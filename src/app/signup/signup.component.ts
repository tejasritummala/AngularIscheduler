import { Component, OnInit} from '@angular/core';

import { Validators, FormBuilder} from '@angular/forms';
import { Signup, SignupResponse, Countries} from './signup.model';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { ValidatorsService } from '../HelperServices/validators.service';
import { ElementRef, ViewChild, Inject } from '@angular/core';
import { WINDOW } from '../about-product/window.service';
import { environment } from '../../environments/environment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('captchaRef', { static: false }) captcha: ElementRef;
  @ViewChild('captchaControl', { static: true }) captchaControl: ElementRef;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;

  errorMessage: string;
  signupForm: any;
  mismatch = false;
  capchastr = '';
  isValidCaptcha = false;
  checkbox = false;
  phide = false;
  cphide = false;
  countries = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private fb: FormBuilder, private router: Router,
    // tslint:disable-next-line: align
    // tslint:disable-next-line: max-line-length
              private validatorsService: ValidatorsService, @Inject(WINDOW) private window, private signupService: SignupService, private snackBar: MatSnackBar) {
    /*Initialize form fields Group*/
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', this.validatorsService.emailValidator],
      phone: ['', this.validatorsService.phoneNumberValidator],
      password: ['', this.validatorsService.passwordValidator],
      confirmPassword: [''],
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      webUrl: ['', this.validatorsService.urlValidator],
      recaptcha: [''],
      checkbox: ['']
    }, { validator: this.validatorsService.passwordMatchValidator },
    );
  }
  ngOnInit() {
    console.log(environment);
    this.getCountries();
  }

  /* Function to receive signup form values*/
  captchaCallBack(response) {
    this.isValidCaptcha = false;
    this.signupForm.controls.recaptcha.value = '';
    if (response && response.type === 'success') {
      this.signupForm.controls.recaptcha.value = response.token;
    } else {
      this.isValidCaptcha = true;

    }
  }

/*Get Countries Selection Data*/
  getCountries() {
    this.signupService.countries().pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {
      const countriesData = new Countries(data);
      if (countriesData.code === 200) {
        this.countries = countriesData.countries;
      }
    }, error => {
    });

  }
/*Signup Service Call */
  signUpServiceCall(signupdata) {
    const obj = new Signup(signupdata);
    this.signupService.signup(obj).pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {

      const successData = new SignupResponse(data);
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
      const failureData = new SignupResponse(error.error);
      this.errorMessage = failureData.message;
      this.snackBar.open(this.errorMessage, '', {
        duration: 2000,
      });
    });

  }
  /*Form Submission*/
  onSubmit() {
    /*Compare values and show the errors*/
    this.isValidCaptcha = false;
    this.checkbox = false;
    if (this.signupForm.valid) {
      if (this.signupForm.controls.checkbox.value === true) {
        if (this.signupForm.controls.recaptcha.value.length > 0) {

          this.signUpServiceCall(this.signupForm.value);

        } else {
          this.isValidCaptcha = true;
        }
      } else {
        this.checkbox = true;
        if (this.signupForm.controls.recaptcha.value.length <= 0) {
          this.isValidCaptcha = true;
        }
      }
    } else {
      if (this.signupForm.controls.checkbox.value === '' || this.signupForm.controls.checkbox.value === false) {
        this.checkbox = true;
      }
      if (this.signupForm.controls.recaptcha.value.length <= 0) {
        this.isValidCaptcha = true;
      }
    }
  }
  /*Find the check box value*/
  checkboxFn() {
    if (this.signupForm.controls.checkbox.value === true) {
      this.checkbox = false;
    } else {
      this.checkbox = true;
    }
  }
  /*Display the form Required fields Error Messages*/
  getErrorMessage(controlName: string) {
    return this.signupForm.controls[controlName].hasError('invalidEmailAddress') ? 'Invalid email address' :
      this.signupForm.controls[controlName].hasError('invalidNumber') ? 'Not a valid phone number' :
        this.signupForm.controls[controlName].hasError('invalidUrl') ? 'Invalid Url' :
          this.signupForm.controls[controlName].hasError('required') ? 'You must enter a value' :
            this.signupForm.controls[controlName].hasError('invalidPassword') ? 'Invalid password. Password must contain a number' : '';
  }
  // tslint:disable-next-line: use-lifecycle-interface
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }



}
