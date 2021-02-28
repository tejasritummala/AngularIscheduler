
export class UsersList {
    index;
    limit;
    // tslint:disable-next-line: variable-name
    sort_by;
    // tslint:disable-next-line: variable-name
    order_by;
    // tslint:disable-next-line: variable-name
    search_value;
    // tslint:disable-next-line: variable-name
    search;
    constructor(userReq) {
        this.index = 0;
        this.limit = 0;
        this.sort_by = '';
        this.order_by = '';
        if ('index' in userReq) {
            this.index = userReq.index;
        }
        if ('limit' in userReq) {
            this.limit = userReq.limit;

        }
        if ('sort_by' in userReq) {
            if (userReq.sort_by.length > 0) {
                this.sort_by = userReq.sort_by;
            }
        }
        if ('order_by' in userReq) {
            if (userReq.order_by.length > 0) {
                this.order_by = userReq.order_by;
            }
        }
        if ('search' in userReq) {

            if (userReq.search.length > 0) {
                this.search_value = userReq.search;
            }


        }

        if ('user_type' in userReq) {
            if (userReq.user_type.length > 0) {
                if (userReq.user_type === 'All') {
                } else {
                    this.search = new Search(userReq.user_type.toLowerCase());
                }
            }

        }

    }
}
export class Search {
    // tslint:disable-next-line: variable-name
    user_type;
    constructor(serchObj) {
        this.user_type = '';

        if (serchObj.length > 0) {
            this.user_type = serchObj;
        }


    }

}
/*Signup Response Model*/
export class UserListResponse {
    code;
    message;
    count;
    users;
    constructor(usersObj) {
        this.code = '';
        this.message = '';
        this.count = 0;
        this.users = [];
        if ('code' in usersObj) {
            this.code = usersObj.code;
        }
        if ('count' in usersObj) {
            this.count = usersObj.count;
        }
        if ('message' in usersObj) {
            if (usersObj.message.length > 0) {
                this.message = usersObj.message;
            }
        }
        if ('result' in usersObj) {
            if (usersObj.result.length > 0) {
                for (const user of usersObj.result) {
                    const userItem = new UserList(user);
                    this.users.push(userItem);
                }
            }
        }

    }
}
/*Userlist List Model Response*/
export class UserList {
    // tslint:disable-next-line: variable-name
    first_name;
    // tslint:disable-next-line: variable-name
    last_name;
    // tslint:disable-next-line: variable-name
    user_name;
    // tslint:disable-next-line: variable-name
    user_type;
    status;
    // tslint:disable-next-line: variable-name
    user_id;
    // tslint:disable-next-line: variable-name
    invited_date;
    // tslint:disable-next-line: variable-name
    joined_date;
    statusColor;
    constructor(userObj) {
        this.first_name = '';
        this.last_name = '';
        this.user_name = '';
        this.user_type = '';
        this.status = '';
        this.user_id = '';
        this.invited_date = '';
        this.joined_date = '';
        this.statusColor = '#6921e';





        try {
            if ('first_name' in userObj) {
                if (userObj.first_name.length > 0) {
                    this.first_name = userObj.first_name;
                }
            }
        } catch (error) {

        }
        try {
            if ('last_name' in userObj) {
                if (userObj.last_name.length > 0) {
                    this.last_name = userObj.last_name;
                }
            }
        } catch (error) {

        }
        try {
            if ('user_name' in userObj) {
                if (userObj.user_name.length > 0) {
                    this.user_name = userObj.user_name;
                }
            }
        } catch (error) {

        }
        try {
            if ('user_type' in userObj) {
                if (userObj.user_type.length > 0) {
                    this.user_type = userObj.user_type;
                }
            }
        } catch (error) {

        }
        try {
            if ('status' in userObj) {
                if (userObj.status.length > 0) {
                    this.status = userObj.status;

                    switch (this.status.toLowerCase()) {
                        case 'invited':
                            this.statusColor = '#25a9e0';
                            break;
                        case 'active':
                            this.statusColor = '#00a551';
                            break;
                        case 'inactive':
                            this.statusColor = '#ec1c24';
                            break;
                        default:
                            this.statusColor = '#f6921e';
                            break;
                    }

                }
            }
        } catch (error) {

        }
        try {
            if ('user_id' in userObj) {
                if (userObj.user_id.length > 0) {
                    this.user_id = userObj.user_id;
                }
            }
        } catch (error) {

        }
        try {
            if ('invited_date' in userObj) {
                if (userObj.invited_date.length > 0) {
                    this.invited_date = userObj.invited_date;
                }
            }
        } catch (error) {

        }
        try {
            if ('joined_date' in userObj) {
                if (userObj.joined_date.length > 0) {
                    this.joined_date = userObj.joined_date;
                }
            }
        } catch (error) {

        }

    }
}

/*UserIds List*/
export class UserIdsInput {
    id;
    constructor(users) {
        this.id = [];
        if (users.length > 0) {
            this.id = users.map(user => user.user_id);
        }
    }
}

function pick(obj, keys) {
    return keys.map(k => k in obj ? {[k]: obj[k]} : {})
               .reduce((res, o) => Object.assign(res, o), {});
}
export class SendInvitationInput {
    users;
    constructor(users) {
        this.users = [];
        if (users.length > 0) {
            this.users  = users.map(user => {
                return pick(user, ['first_name', 'last_name', 'user_name', 'user_type']);
             });
        }
    }
}






