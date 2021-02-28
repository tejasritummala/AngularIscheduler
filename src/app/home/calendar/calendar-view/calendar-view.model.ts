export class CalendarView {
}


/*Calendars Response Model*/
export class CalendarsResponse {
    code;
    message;
    count;
    calendars;
    constructor(usersObj) {
        this.code = '';
        this.message = '';
        this.count = 0;
        this.calendars = [];
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
                for (const calendar of usersObj.result) {
                    const calendarItem = new CalendarsList(calendar);
                    this.calendars.push(calendarItem);
                }
            }
        }

    }
}
/*Userlist List Model Response*/
export class CalendarsList {
    // tslint:disable-next-line: variable-name
    calendar_name;
    // tslint:disable-next-line: variable-name
    is_default;
    // tslint:disable-next-line: variable-name
    calendar_description;
    // tslint:disable-next-line: variable-name
    calendar_id;
    constructor(calObj) {
        this.calendar_name = '';
        this.is_default = '';
        this.calendar_description = '';
        this.calendar_id = '';

        try {
            if ('calendar_name' in calObj) {
                if (calObj.calendar_name.length > 0) {
                    this.calendar_name = calObj.calendar_name;
                }
            }
        } catch (error) {

        }
        try {
            if ('is_default' in calObj) {

                this.is_default = calObj.is_default;

            }
        } catch (error) {

        }
        try {
            if ('calendar_description' in calObj) {
                if (calObj.calendar_description.length > 0) {
                    this.calendar_description = calObj.calendar_description;
                }
            }
        } catch (error) {

        }
        try {
            if ('calendar_id' in calObj) {
                if (calObj.calendar_id.length > 0) {
                    this.calendar_id = calObj.calendar_id;
                }
            }
        } catch (error) {

        }

    }
}


