import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStationListComponent } from './ticket-station-list.component';

describe('TicketStationListComponent', () => {
  let component: TicketStationListComponent;
  let fixture: ComponentFixture<TicketStationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketStationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketStationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
