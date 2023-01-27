import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisIncomeComponent } from './lis-income.component';

describe('LisIncomeComponent', () => {
  let component: LisIncomeComponent;
  let fixture: ComponentFixture<LisIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LisIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LisIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
