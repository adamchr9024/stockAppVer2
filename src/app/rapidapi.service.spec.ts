import { TestBed } from '@angular/core/testing';

import { RapidapiService } from './rapidapi.service';

describe('RapidapiService', () => {
  let service: RapidapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapidapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
