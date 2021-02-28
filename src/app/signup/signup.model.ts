/*Signup input Model*/
export class Signup {
    // tslint:disable-next-line: variable-name
    first_name;
    // tslint:disable-next-line: variable-name
    last_name;
    // tslint:disable-next-line: variable-name
    company_name;
    // tslint:disable-next-line: variable-name
    email_id;
    password;
    // tslint:disable-next-line: variable-name
    phone_number;
    website;
    // tslint:disable-next-line: variable-name
    country_id;
    // tslint:disable-next-line: variable-name
    captcha_response;

    constructor(signupObj) {

        this.first_name = '';
        this.last_name = '';
        this.company_name = '';
        this.email_id = '';
        this.password = '';
        this.phone_number = '';
        this.website = '';
        this.country_id = '';
        this.captcha_response = '';
        if ('firstName' in signupObj) {
            if (signupObj.firstName.length > 0) {
                this.first_name = signupObj.firstName;
            }
        }
        if ('lastName' in signupObj) {
            if (signupObj.lastName.length > 0) {
                this.last_name = signupObj.lastName;
            }
        }
        if ('companyName' in signupObj) {
            if (signupObj.companyName.length > 0) {
                this.company_name = signupObj.companyName;
            }
        }
        if ('email' in signupObj) {
            if (signupObj.email.length > 0) {
                this.email_id = signupObj.email;
            }
        }
        if ('password' in signupObj) {
            if (signupObj.password.length > 0) {
                this.password = signupObj.password;
            }
        }
        if ('phone' in signupObj) {
            if (signupObj.phone.length > 0) {
                this.phone_number = signupObj.phone;
            }
        }
        if ('webUrl' in signupObj) {
            if (signupObj.webUrl.length > 0) {
                this.website = signupObj.webUrl;
            }
        }
        if ('country' in signupObj) {
            if (signupObj.country.length > 0) {
                this.country_id = signupObj.country;
            }
        }
        if ('recaptcha' in signupObj) {
            if (signupObj.recaptcha.length > 0) {
                this.captcha_response = signupObj.country;
            }
        }
    }
}
/*Signup Response Model*/
export class SignupResponse {
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
/*Countries Model*/
export class Countries {
    code;
    message;
    count;
    countries;
    constructor(countriesObj) {
        this.code = '';
        this.message = '';
        this.count = 0;
        this.countries = [];
        if ('code' in countriesObj) {
            this.code = countriesObj.code;
        }
        if ('count' in countriesObj) {
            this.count = countriesObj.count;
        }
        if ('message' in countriesObj) {
            if (countriesObj.message.length > 0) {
                this.message = countriesObj.message;
            }
        }
        if ('result' in countriesObj) {
            if (countriesObj.result.length > 0) {
                for (const country of countriesObj.result) {
                    const countryItem = new CountryResult(country);
                    this.countries.push(countryItem);
                }
            }
        }

    }
}
/*Countries List Model*/
export class CountryResult {
    id;
    name;
    constructor(countryObj) {
        this.id = '';
        this.name = '';

        if ('id' in countryObj) {
            if (countryObj.id.length > 0) {
                this.id = countryObj.id;
            }
        }
        if ('name' in countryObj) {
            if (countryObj.name.length > 0) {
                this.name = countryObj.name;
            }
        }

    }
}
