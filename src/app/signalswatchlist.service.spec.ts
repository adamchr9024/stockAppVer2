import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SignalswatchlistService } from './signalswatchlist.service';

describe('SignalswatchlistService', () => {
  let service: SignalswatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(SignalswatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
