import { Component, OnInit } from '@angular/core';
import { EventPageEnum } from 'src/app/models/EventPageEnum';

@Component({
  selector: 'app-event-manage',
  templateUrl: './event-manage.component.html',
  styleUrls: ['./event-manage.component.css']
})
export class EventManageComponent implements OnInit {


  get  EventPageTypes(): typeof EventPageEnum {
    return EventPageEnum;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
