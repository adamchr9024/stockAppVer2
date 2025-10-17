import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { RapidapiService } from './rapidapi.service';

describe('RapidapiService', () => {
  let service: RapidapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RapidapiService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(RapidapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
