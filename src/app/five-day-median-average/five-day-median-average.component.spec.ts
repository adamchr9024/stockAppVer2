import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveDayMedianAverageComponent } from './five-day-median-average.component';

describe('FiveDayMedianAverageComponent', () => {
  let component: FiveDayMedianAverageComponent;
  let fixture: ComponentFixture<FiveDayMedianAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiveDayMedianAverageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveDayMedianAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
