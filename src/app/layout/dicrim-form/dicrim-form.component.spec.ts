import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicrimFormComponent } from './dicrim-form.component';

describe('DicrimFormComponent', () => {
  let component: DicrimFormComponent;
  let fixture: ComponentFixture<DicrimFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DicrimFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicrimFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
