import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManageComponent } from './event-manage.component';

describe('EventManageComponent', () => {
  let component: EventManageComponent;
  let fixture: ComponentFixture<EventManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
