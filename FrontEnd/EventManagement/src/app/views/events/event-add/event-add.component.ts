import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { IUser } from 'src/app/models/IUser';
import { ILocation } from 'src/app/models/ILocation';
import { IEvent } from 'src/app/models/IEvent';

@Component({
  selector: 'event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {


  currentUser!: IUser;
  objectKeys = Object.keys;
  locationTypes: Array<any> = [];
  locations: ILocation[] = [];
  eventForm!: FormGroup;
  formSubmited: boolean = false;
  selectedLocationEvents!: String[];
  get formControls() { return this.eventForm.controls; }

  constructor(
    private eventService: EventService,
    private locationService: LocationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private location: Location,
    private userService: UserService) {

  }

  ngOnInit(): void {

    this.userService.userState.subscribe(res => {
      this.currentUser = res;
    });

    this.locationService.getLocations().subscribe(res => {
      console.log(res);
      this.locations = res;
    })
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      start: [null, Validators.required],
      location: [null, Validators.required],
      eventType: ['', Validators.required]
    });
  }

  addEvent() {
    this.formSubmited = true;
    const formValue = this.eventForm.value;
    console.log(formValue)
    if (this.eventForm.invalid) return;

    let event: IEvent = this.eventForm.value;
    event.managedBy = this.currentUser._id as string;
    console.log(event);
    this.eventService.addEvent(event).subscribe(res => {
      this.toastr.success('Event Added successfully');
      this.router.navigate(['events'])
    })
  }

  goBack() {
    this.location.back();
  }

  selectedLocationChange(value: ILocation) {
    console.log(value)
    const supportedLocations = this.locations.find(l => l._id == value._id)?.supportedEvents;
    this.selectedLocationEvents = supportedLocations == null ? [] : supportedLocations;
  }
}
