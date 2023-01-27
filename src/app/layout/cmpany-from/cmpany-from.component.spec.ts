import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpanyFromComponent } from './cmpany-from.component';

describe('CmpanyFromComponent', () => {
  let component: CmpanyFromComponent;
  let fixture: ComponentFixture<CmpanyFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmpanyFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmpanyFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
