import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrinstListComponent } from './trinst-list.component';

describe('TrinstListComponent', () => {
  let component: TrinstListComponent;
  let fixture: ComponentFixture<TrinstListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrinstListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrinstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
