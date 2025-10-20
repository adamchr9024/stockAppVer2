import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistComponent } from './watchlist.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SignalswatchlistService } from '../signalswatchlist.service';
import { FinnhubService } from '../finnhub.service';
import { DefaultApi } from 'finnhub-ts';
describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistComponent],
      providers: [SignalswatchlistService, FinnhubService, DefaultApi, HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
