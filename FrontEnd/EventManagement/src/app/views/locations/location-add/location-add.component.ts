import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ILocation } from 'src/app/models/ILocation';
import { EventService } from 'src/app/services/event.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { AttachmentService } from 'src/app/services/attachment.service';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

  objectKeys = Object.keys;
  locationTypes: Array<any> = [];
  locationForm!: FormGroup;
  formSubmited: boolean = false;
  get formControls() { return this.locationForm.controls; }

  constructor(
    private eventService: EventService,
    private locationService: LocationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private location: Location,
    private attachmentService: AttachmentService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    debugger

    this.locationForm = this.formBuilder.group({
      name: ['', Validators.required],
      lng: [null, Validators.required],
      lat: [null, Validators.required],
      website: ['', Validators.required],
      supportedEvents: [[], Validators.required],
      image: [null, Validators.required]

    });
    this.eventService.getEventTypes().subscribe(res => {
      console.log(res);
      this.locationTypes = res;
    })
  }


  addLocation() {

    this.formSubmited = true;
    if (this.locationForm.invalid) return;
    const formValue = this.locationForm.value;
    let location: ILocation = this.locationForm.value;

    debugger
    location.location = [formValue.lng, formValue.lat];

    this.locationService.createLocation(location).subscribe(res => {
      this.toastr.success('Location Added Successfully')
      this.router.navigate(['locations'])
    })

  }

  goBack() {
    this.location.back();
  }

  onSelectFile(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {

      let file = event.target.files[0];
      console.log(file);
      const formData = new FormData();
      formData.set('myFile', event.target.files[0], file.name);
      debugger
      let getAll = formData.getAll('myFile')
      this.attachmentService.uploadAttachmnet(formData).subscribe(res => {
        console.log(res);
        this.locationForm.controls['image'].patchValue(res);
      })
    }

  }
}
