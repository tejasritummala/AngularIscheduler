export class AddNewCalendar {

    // tslint:disable-next-line: variable-name
    calendar_name;
    // tslint:disable-next-line: variable-name
    calendar_description;
    timezone;
    constructor(calObj) {
        this.calendar_name = '';
        this.calendar_description = '';
        this.timezone = '';
        if ('calName' in calObj) {
            if (calObj.calName.length > 0) {
                this.calendar_name = calObj.calName;
            }
        }
        if ('timeZone' in calObj) {
            if (calObj.timeZone.length > 0) {
                this.timezone = calObj.timeZone;
            }
        }
        if ('description' in calObj) {
            if (calObj.description.length > 0) {
                this.calendar_description = calObj.description;
            }
        }
    }
}

/*Signup Response Model*/
export class AddNewCalendarResponse {
    code;
    message;
    constructor(calObj) {
        this.code = '';
        this.message = '';
        try {
            if ('code' in calObj) {
                this.code = calObj.code;
            }
        } catch (error) {

        }
        try {
            if ('message' in calObj) {
                if (calObj.message.length > 0) {
                    this.message = calObj.message;
                }
            }
        } catch (error) {

        }

    }
}

