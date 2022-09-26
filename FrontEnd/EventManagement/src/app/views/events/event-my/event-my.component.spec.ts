import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMyComponent } from './event-my.component';

describe('EventMyComponent', () => {
  let component: EventMyComponent;
  let fixture: ComponentFixture<EventMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
