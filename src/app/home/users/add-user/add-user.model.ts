
/*Countries Model*/
export class AddUser {
    // tslint:disable-next-line: variable-name
    users;
    constructor(usersArray, type) {
        this.users = [];
        const users = usersArray.users;
        if (users.length > 0) {
            for (const user of users) {
                const userItem = new User(user, type);
                this.users.push(userItem);
            }
        }

    }
}
/*Countries List Model*/
export class User {
    // tslint:disable-next-line: variable-name
    first_name;
    // tslint:disable-next-line: variable-name
    last_name;
    // tslint:disable-next-line: variable-name
    email_id;
    // tslint:disable-next-line: variable-name
    user_type;
    constructor(userObj, type) {
        this.first_name = '';
        this.last_name = '';
        this.email_id = '';
        this.user_type = type;

        try {
            if ('firstname' in userObj) {
                if (userObj.firstname.length > 0) {
                    this.first_name = userObj.firstname;
                }
            }
        } catch (error) {

        }

        try {
            if ('lastname' in userObj) {
                if (userObj.lastname.length > 0) {
                    this.last_name = userObj.lastname;
                }
            }
        } catch (error) {

        }
        try {
            if ('email' in userObj) {
                if (userObj.email.length > 0) {
                    this.email_id = userObj.email;
                }
            }
        } catch (error) {

        }

    }
}



/*Signup Response Model*/
export class AdduserResponse {
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



