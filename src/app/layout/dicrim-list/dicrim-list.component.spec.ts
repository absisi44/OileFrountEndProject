import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicrimListComponent } from './dicrim-list.component';

describe('DicrimListComponent', () => {
  let component: DicrimListComponent;
  let fixture: ComponentFixture<DicrimListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DicrimListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicrimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
