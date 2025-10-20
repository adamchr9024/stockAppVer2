import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocktableComponent } from './stocktable.component';
import { FinnhubService } from '../finnhub.service';
import { DefaultApi } from 'finnhub-ts';
import { SignalswatchlistService } from '../signalswatchlist.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('StocktableComponent', () => {
  let component: StocktableComponent;
  let fixture: ComponentFixture<StocktableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StocktableComponent],
      providers: [FinnhubService, DefaultApi, SignalswatchlistService, HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StocktableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
