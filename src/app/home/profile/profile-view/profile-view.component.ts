import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ValidatorsService } from '../../../HelperServices/validators.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  changepwdform;
  profileForm;
  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService, ) {

    // change password form
    this.changepwdform = new FormGroup({
      newpassword: new FormControl('', [Validators.required, this.validatorsService.passwordValidator]),
      currentpassword: new FormControl('', [Validators.required, this.validatorsService.passwordValidator]),
      confirmpassword: new FormControl('', [Validators.required, this.passwordMatcher.bind(this)]),
    });


    // profile settings
    this.profileForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      welcometext: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, this.validatorsService.emailValidator]),
      public: [false],
    });
  }


  passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.changepwdform &&
      (control.value !== this.changepwdform.controls.newpassword.value)
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }
  ngOnInit() {
  }

  /*Error messages*/
  getErrorMessage(controlName: string) {
    return this.changepwdform.controls[controlName].hasError('required') ? 'You must enter a value' :
      this.changepwdform.controls[controlName].hasError('invalidEmailAddress') ? 'Invalid email address' :
        this.changepwdform.controls[controlName].hasError('invalidPassword') ? 'Invalid password. Password must contain a number' : '';;
  }

  /*Error messages*/
  getErrorMessage2(controlName: string) {
    return this.profileForm.controls[controlName].hasError('required') ? 'You must enter a value' :
      this.profileForm.controls[controlName].hasError('invalidEmailAddress') ? 'Invalid email address' :
        this.profileForm.controls[controlName].hasError('passwordNotMatch') ? 'Password mismatch' :
          this.profileForm.controls[controlName].hasError('invalidPassword') ? 'Invalid password. Password must contain a number' : '';;
  }


  onSubmitchngPwd() {
    if (this.changepwdform.valid) {
      alert(JSON.stringify(this.changepwdform.value))
    }
  }

  onSaveprofile() {
    if (this.profileForm.valid) {
      alert(JSON.stringify(this.profileForm.value))
    }
  }
}
