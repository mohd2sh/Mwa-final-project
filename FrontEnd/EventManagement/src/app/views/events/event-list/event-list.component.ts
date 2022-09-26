import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEvent } from 'src/app/models/IEvent';
import { IUser } from 'src/app/models/IUser';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {
  currentLocation: any;
  events: IEvent[] = [];
  currentUser!: IUser;

  subscriptions: Subscription[] = [];
  constructor(private router: Router,
    public dialog: MatDialog,
    private eventService: EventService, private userService: UserService, private toastr: ToastrService) { }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    })
  }
  ngOnInit(): void {

    this.userService.userState.subscribe(res => {
      this.currentUser = res;
    })
    navigator.geolocation.getCurrentPosition(position => {
      let location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.currentLocation = location;

      this.getEvents(location);
    })

  }

  onParticipate(eventId: string) {
    this.eventService.participateInAnEvent(this.currentUser, eventId).subscribe(res => {
      //todo: sho notification

      //Remove the cuurent event because he cannot participate twice
      //And now it should displayed in the up comming events.
      this.events = this.events.filter(a => a._id != eventId);
      this.toastr.success('You registered successfully for the event')
    })
  }

  getEvents(location: any) {
    this.subscriptions.push(this.eventService.getNearByEvents(location.lng, location.lat).subscribe(res => {
      res.map(a => {
        a.start = new Date(a.start);
        return a;
      })
      this.events = res;
      console.log(res);
    }))
  }

  onAddEventClick() {
    this.router.navigate(['events', 'add']);
  }

  onKnowMoreClick(item: IEvent) {
    this.dialog.open(EventListKnowMoreDialog, {
      data: item.participants,
    });
  }



}

@Component({
  selector: 'event-list-know-more',
  templateUrl: 'event-list-know-more.html',
})
export class EventListKnowMoreDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IUser[]) {
    console.log(data);
  }
}


