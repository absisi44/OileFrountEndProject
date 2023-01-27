import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStationFormComponent } from './ticket-station-form.component';

describe('TicketStationFormComponent', () => {
  let component: TicketStationFormComponent;
  let fixture: ComponentFixture<TicketStationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketStationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketStationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
