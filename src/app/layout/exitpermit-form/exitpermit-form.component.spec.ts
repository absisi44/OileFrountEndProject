import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitpermitFormComponent } from './exitpermit-form.component';

describe('ExitpermitFormComponent', () => {
  let component: ExitpermitFormComponent;
  let fixture: ComponentFixture<ExitpermitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitpermitFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitpermitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
