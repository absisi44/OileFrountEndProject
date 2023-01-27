import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisfoemsaveComponent } from './disfoemsave.component';

describe('DisfoemsaveComponent', () => {
  let component: DisfoemsaveComponent;
  let fixture: ComponentFixture<DisfoemsaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisfoemsaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisfoemsaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
