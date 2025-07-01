import { TestBed } from '@angular/core/testing';

import { SignalswatchlistService } from './signalswatchlist.service';

describe('SignalswatchlistService', () => {
  let service: SignalswatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalswatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
