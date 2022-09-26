import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMyTabsComponent } from './event-my-tabs.component';

describe('EventMyTabsComponent', () => {
  let component: EventMyTabsComponent;
  let fixture: ComponentFixture<EventMyTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMyTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMyTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
