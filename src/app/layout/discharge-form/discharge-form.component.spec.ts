import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeFormComponent } from './discharge-form.component';

describe('DischargeFormComponent', () => {
  let component: DischargeFormComponent;
  let fixture: ComponentFixture<DischargeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DischargeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DischargeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
