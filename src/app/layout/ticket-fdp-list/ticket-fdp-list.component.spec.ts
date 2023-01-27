import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFdpListComponent } from './ticket-fdp-list.component';

describe('TicketFdpListComponent', () => {
  let component: TicketFdpListComponent;
  let fixture: ComponentFixture<TicketFdpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketFdpListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketFdpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
