import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { switchMap, tap } from 'rxjs'
import { IUser } from 'src/app/models/IUser';
import { IEvent } from 'src/app/models/IEvent';
import { ToastrService } from 'ngx-toastr';
import { EventPageEnum } from 'src/app/models/EventPageEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'event-my',
  templateUrl: './event-my.component.html',
  styleUrls: ['./event-my.component.css']
})
export class EventMyComponent implements OnInit, OnDestroy {

  user!: IUser;
  events: IEvent[] = [];
  @Input('type') type!: EventPageEnum;

  get EventPageTypes(): typeof EventPageEnum {
    return EventPageEnum;
  }

  constructor(private router: Router, private eventService: EventService, private userService: UserService, private toastr: ToastrService) { }
  ngOnDestroy(): void {
    console.log('On Destroy')
  }

  ngOnInit(): void {
    console.log('On init')

    this.userService.userState
      .pipe(
        tap(user => { this.user = user }),
        switchMap(user => this.eventService.getEventsThatUserInIt(user, this.type)))
      .subscribe(res => {
        res = res.map(a => {
          a.start = new Date(a.start);
          return a;
        })
        this.events = res;
        console.log(res);
      })
  }

  onUnParticipate(eventId: string) {
    this.eventService.unparticipateInAnEvent(this.user, eventId).subscribe(res => {

      this.events = this.events.filter(a => a._id != eventId);
      this.toastr.success('You registered successfully for the event')
    })
  }

  onDeleteEvent(id: string) {
    this.eventService.deleteEvent(id).subscribe(res=>{
      this.toastr.success('Event deleted successfully')
      this.events=this.events.filter(a => a._id!=id);
    })
  }

  onEditEvent(id: string) {
    this.router.navigate(['events', 'edit', id])
  }

}
