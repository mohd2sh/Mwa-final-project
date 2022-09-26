import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventAddComponent } from './event-add/event-add.component';
import { EventListComponent, EventListKnowMoreDialog } from './event-list/event-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AlertModule } from 'ngx-bootstrap/alert';
import { EventMyComponent } from './event-my/event-my.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { EventMyTabsComponent } from './event-my-tabs/event-my-tabs.component';
import { EventManageComponent } from './event-manage/event-manage.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import {MatDialogModule} from '@angular/material/dialog';


const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'add', component: EventAddComponent },
  { path: 'my', component: EventMyTabsComponent },
  { path: 'manage', component: EventManageComponent },
  { path: 'edit/:id', component: EventEditComponent },
];


@NgModule({
  declarations: [
    EventAddComponent,
    EventListComponent,
    EventMyComponent,
    EventMyTabsComponent,
    EventManageComponent,
    EventEditComponent,
    EventListKnowMoreDialog
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    AlertModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatDialogModule
  ]
})
export class EventsModule { }
