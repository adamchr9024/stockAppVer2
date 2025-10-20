import { TestBed } from '@angular/core/testing';
import { provideHttpClient, } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RapidapiService } from './rapidapi.service';

describe('RapidapiService', () => {
  let service: RapidapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(),  //must come first
      provideHttpClientTesting()]
    });
    service = TestBed.inject(RapidapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
