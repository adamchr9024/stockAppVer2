import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AristocratStockComponent } from './aristocrat-stock.component';
import { RapidapiService } from '../rapidapi.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AristocratStockComponent', () => {
  let component: AristocratStockComponent;
  let fixture: ComponentFixture<AristocratStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AristocratStockComponent],
      providers: [RapidapiService, HttpClient, HttpHandler, provideAnimations()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AristocratStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
