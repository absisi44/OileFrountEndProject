import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInfstockComponent } from './list-infstock.component';

describe('ListInfstockComponent', () => {
  let component: ListInfstockComponent;
  let fixture: ComponentFixture<ListInfstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInfstockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInfstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
