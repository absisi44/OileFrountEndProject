import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitpermitListComponent } from './exitpermit-list.component';

describe('ExitpermitListComponent', () => {
  let component: ExitpermitListComponent;
  let fixture: ComponentFixture<ExitpermitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitpermitListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitpermitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
