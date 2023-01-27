import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrinstFormComponent } from './trinst-form.component';

describe('TrinstFormComponent', () => {
  let component: TrinstFormComponent;
  let fixture: ComponentFixture<TrinstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrinstFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrinstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
