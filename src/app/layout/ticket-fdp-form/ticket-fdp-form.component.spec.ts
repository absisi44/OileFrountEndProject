import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFdpFormComponent } from './ticket-fdp-form.component';

describe('TicketFdpFormComponent', () => {
  let component: TicketFdpFormComponent;
  let fixture: ComponentFixture<TicketFdpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketFdpFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketFdpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
