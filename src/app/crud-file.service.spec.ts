import { TestBed } from '@angular/core/testing';

import { CrudFileService } from './crud-file.service';

describe('CrudFileService', () => {
  let service: CrudFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
