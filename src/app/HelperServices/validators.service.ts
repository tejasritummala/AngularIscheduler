/*Validate Form Controls using Regular expressions*/

import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }


  /*Validate Email Address Text*/
  emailValidator(control) {
    // tslint:disable-next-line:max-line-length
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

   /*Validate Password Text*/
  passwordValidator(control) {
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

   /*Validate phone number Text*/
  phoneNumberValidator(control) {
    if (control.value.match(/^\d{10}$/)) {
      return null;
    } else {
      return { invalidNumber: true };
    }
  }

   /*Validate and compare Conform password with passord*/
  passwordMatchValidator(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (password !== confirmPassword) {
      console.log('false');
      AC.get('confirmPassword').setErrors({ MatchPassword: true })
    } else {
      console.log('true');
      return null;
    }
  }

  /*Validate Website URL*/
  urlValidator(control) {
    if (control.value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
      return null;
    } else {
      return { invalidUrl: true };
    }
  }
}
