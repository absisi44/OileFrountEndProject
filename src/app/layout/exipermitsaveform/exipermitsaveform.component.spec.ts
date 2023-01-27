import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExipermitsaveformComponent } from './exipermitsaveform.component';

describe('ExipermitsaveformComponent', () => {
  let component: ExipermitsaveformComponent;
  let fixture: ComponentFixture<ExipermitsaveformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExipermitsaveformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExipermitsaveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
