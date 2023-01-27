import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitPrintComponent } from './exit-print.component';

describe('ExitPrintComponent', () => {
  let component: ExitPrintComponent;
  let fixture: ComponentFixture<ExitPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
