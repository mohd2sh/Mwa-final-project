import { Component, OnInit } from '@angular/core';
import { EventPageEnum } from 'src/app/models/EventPageEnum';

@Component({
  selector: 'app-event-my-tabs',
  templateUrl: './event-my-tabs.component.html',
  styleUrls: ['./event-my-tabs.component.css']
})
export class EventMyTabsComponent implements OnInit {

  get type(): typeof EventPageEnum {
    return EventPageEnum;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
