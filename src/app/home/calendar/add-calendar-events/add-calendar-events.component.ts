import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormsModule,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  FormBuilder
} from "@angular/forms";

export interface States {
  value: string;
  viewValue: string;
}
@Component({
  selector: "app-add-calendar-events",
  templateUrl: "./add-calendar-events.component.html",
  styleUrls: ["./add-calendar-events.component.css"]
})
export class AddCalendarEventsComponent implements OnInit {
  createEventsForm;
  emailArr;

  selectedValue: string = "Busy";
  usersArr = [
    { id: "1", name: "John" },
    { id: "2", name: "Andrew" },
    { id: "3", name: "Michel" },
    { id: "4", name: "Mark" },
    { id: "5", name: "John" },
    { id: "6", name: "Andrew" }
  ];

  states: States[] = [
    { value: "Busy", viewValue: "Busy" },
    { value: "Free", viewValue: "Free" }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createEventsForm = this.fb.group({
      evtName: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
      time: new FormControl(""),
      toTime: new FormControl(""),
      location: new FormControl(""),
      description: new FormControl(""),
      email: new FormArray([])
    });
  }

  ngOnInit() {
    this.emailArr = <FormArray>this.createEventsForm.controls.email;
    this.emailArr.push(
      new FormGroup({
        email: new FormControl()
      })
    );
  }
  onCancelEvent() {
    debugger;
    this.router.navigate(["../calendar"], { relativeTo: this.route });
  }
  onCreateEvent() {
    if (this.createEventsForm.valid) {
      console.log(this.createEventsForm.value);
    }
  }
  addNew() {
    debugger;
    let emailcontrols = this.createEventsForm.controls["email"].value;
    if (emailcontrols[emailcontrols.length - 1].email == null) {
      emailcontrols[emailcontrols.length - 1].email = "";
    }
    if (emailcontrols[emailcontrols.length - 1].email.trim() !== "") {
      this.emailArr.push(
        new FormGroup({
          email: new FormControl()
        })
      );
    }
  }
  remove(data) {
    const index = this.emailArr.value.indexOf(data.value);
    if (index > -1) {
      this.emailArr.controls.splice(index, 1);
      this.emailArr.value.splice(index, 1);
    }
  }
}
