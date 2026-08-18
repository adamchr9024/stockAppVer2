import { TestBed } from '@angular/core/testing';

import { CrudFileService } from './crud-file.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { provideHttpClient, } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CrudFileService', () => {
  let service: CrudFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(),  //must come first
      provideHttpClientTesting()]
    });
    service = TestBed.inject(CrudFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
/*
TestBed.configureTestingModule({
      providers: [provideHttpClient(),  //must come first
      provideHttpClientTesting()]
    });*/