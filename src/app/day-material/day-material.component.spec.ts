import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayMaterialComponent } from './day-material.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('DayMaterialComponent', () => {
  let component: DayMaterialComponent;
  let fixture: ComponentFixture<DayMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayMaterialComponent],
      providers: [provideHttpClientTesting, HttpHandler, HttpClient, provideAnimations()]
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
