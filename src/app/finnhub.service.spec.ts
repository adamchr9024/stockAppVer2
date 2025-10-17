import { TestBed } from '@angular/core/testing';

import { FinnhubService } from './finnhub.service';
import { DefaultApi } from 'finnhub-ts'
describe('FinnhubService', () => {
  let service: FinnhubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinnhubService, DefaultApi]
    });
    service = TestBed.inject(FinnhubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
