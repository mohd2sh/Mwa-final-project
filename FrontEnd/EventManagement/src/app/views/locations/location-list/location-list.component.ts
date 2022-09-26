import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILocation } from 'src/app/models/ILocation';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  locations: ILocation[] = [];
  constructor(private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(res => {
      console.log(res);
      this.locations = res;
    })
  }

  onAddLocationClick() {
    this.router.navigate(['locations', 'add'])
  }

}
