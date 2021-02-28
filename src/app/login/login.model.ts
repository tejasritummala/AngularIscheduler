/*Prepare Login Service Input Data Model*/
export class Login {
  // tslint:disable-next-line: variable-name
  user_name;
  password;
  source;
  constructor(loginObj) {
    this.user_name = '';
    this.password = '';
    this.source = 'web';
    if ('email' in loginObj) {
      if (loginObj.email.length > 0) {
        this.user_name = loginObj.email;
      }
    }
    if ('password' in loginObj) {
      if (loginObj.password.length > 0) {
        this.password = loginObj.password;
      }
    }
  }

}
/*Prepare Login Service OutPut Data Model*/
export class LoginSuccess {
  code;
  message;
  sessionId;
  firstName;
  lastName;
  userId;
  companyId;
  isAdmin;
  constructor(loginObj) {
    this.code = '';
    this.message = '';
    this.sessionId = '';
    this.firstName = '';
    this.lastName = '';
    this.userId = '';
    this.companyId = '';
    this.isAdmin = '';
    if ('code' in loginObj) {
      this.code = loginObj.code;
    }
    if ('message' in loginObj) {
      if (loginObj.message.length > 0) {
        this.message = loginObj.message;
      }
    }

    if ('result' in loginObj) {
      if (loginObj.result.length > 0) {
        const result = new LoginResult(loginObj.result[0]);
        this.sessionId = result.sessionId;
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.userId = result.userId;
        this.companyId = result.companyId;
        this.isAdmin = result.isAdmin;
      }
    }
  }

}
// Nested Login Output Model
export class LoginResult {
  sessionId;
  firstName;
  lastName;
  userId;
  companyId;
  isAdmin;

  constructor(loginObj) {
    this.sessionId = '';
    this.firstName = '';
    this.lastName = '';
    this.userId = '';
    this.companyId = '';
    this.isAdmin = '';

    if ('session_id' in loginObj) {
      if (loginObj.session_id.length > 0) {
        this.sessionId = loginObj.session_id;
      }
    }
    if ('first_name' in loginObj) {
      if (loginObj.first_name.length > 0) {
        this.firstName = loginObj.first_name;
      }
    }
    if ('last_name' in loginObj) {
      if (loginObj.last_name.length > 0) {
        this.lastName = loginObj.last_name;
      }
    }
    if ('user_id' in loginObj) {
      if (loginObj.user_id.length > 0) {
        this.userId = loginObj.user_id;
      }
    }
    if ('company_id' in loginObj) {
      if (loginObj.company_id.length > 0) {
        this.companyId = loginObj.company_id;
      }
    }
    if ('is_admin' in loginObj) {
      if (loginObj.is_admin.length > 0) {
        this.isAdmin = loginObj.is_admin;
      }
    }
  }
}
