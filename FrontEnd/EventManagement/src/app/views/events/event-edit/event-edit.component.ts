import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { IUser } from 'src/app/models/IUser';
import { ILocation } from 'src/app/models/ILocation';
import { IEvent } from 'src/app/models/IEvent';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  event!: IEvent;
  currentUser!: IUser;
  objectKeys = Object.keys;
  locationTypes: Array<any> = [];
  locations: ILocation[] = [];
  eventForm!: FormGroup;
  formSubmited: boolean = false;
  selectedLocationEvents!: String[];
  id!: string;
  get formControls() { return this.eventForm.controls; }

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private locationService: LocationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private location: Location,
    private userService: UserService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;

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

    debugger
    this.eventService.getEventById(this.id).subscribe(res => {
      console.log(res);
      this.event = res;
      this.eventForm.controls['name'].patchValue(res.name);
      this.eventForm.controls['start'].patchValue(new Date(res.start));
      let selectedLocation = this.locations.find(a => a._id == res.location._id);
      this.eventForm.controls['location'].patchValue(selectedLocation);
      this.selectedLocationEvents = res.location.supportedEvents;
      this.eventForm.controls['eventType'].patchValue(res.eventType);
    })
  }

  editEvent() {

    if (this.eventForm.invalid) return;

    let event: IEvent = this.eventForm.value;
    event._id = this.id;
    this.eventService.updateEvent(event).subscribe(res => {

      this.toastr.success('Event Updated successfully');
      this.router.navigate(['events','manage'])
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
