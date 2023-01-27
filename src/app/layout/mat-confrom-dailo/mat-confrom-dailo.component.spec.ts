import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfromDailoComponent } from './mat-confrom-dailo.component';

describe('MatConfromDailoComponent', () => {
  let component: MatConfromDailoComponent;
  let fixture: ComponentFixture<MatConfromDailoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatConfromDailoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatConfromDailoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
