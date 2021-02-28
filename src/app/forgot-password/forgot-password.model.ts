/*Forgot Model*/
export class ForgotPassword {
    // tslint:disable-next-line: variable-name
    email_id;

    constructor(forgotObj) {
      this.email_id = '';
      if ('emailid' in forgotObj) {
        if (forgotObj.emailid.length > 0) {
          this.email_id = forgotObj.emailid;
        }
      }
    }
}
/*Forgot Success Model*/
export class ForgotPasswordResponse {
  code;
  message;
  constructor(forgotObj) {
    this.code = '';
    this.message = '';
    if ('code' in forgotObj) {
      this.code = forgotObj.code;
    }
    if ('message' in forgotObj) {
      if (forgotObj.message.length > 0) {
        this.message = forgotObj.message;
      }
    }

  }
}
