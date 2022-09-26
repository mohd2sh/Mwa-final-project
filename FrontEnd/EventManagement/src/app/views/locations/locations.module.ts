import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationAddComponent } from './location-add/location-add.component';
import { RouterModule, Routes } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  { path: '', component: LocationListComponent },
  { path: 'add', component: LocationAddComponent },
];

@NgModule({
  declarations: [
    LocationListComponent,
    LocationAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class LocationsModule { }
