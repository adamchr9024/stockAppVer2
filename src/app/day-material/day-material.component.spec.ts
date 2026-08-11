import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayMaterialComponent } from './day-material.component';

describe('DayMaterialComponent', () => {
  let component: DayMaterialComponent;
  let fixture: ComponentFixture<DayMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
