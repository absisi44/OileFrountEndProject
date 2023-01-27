import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpanyListComponent } from './cmpany-list.component';

describe('CmpanyListComponent', () => {
  let component: CmpanyListComponent;
  let fixture: ComponentFixture<CmpanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmpanyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmpanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
