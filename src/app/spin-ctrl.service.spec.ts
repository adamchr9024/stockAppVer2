import { TestBed } from '@angular/core/testing';

import { SpinCtrlService } from './spin-ctrl.service';

describe('SpinCtrlService', () => {
  let service: SpinCtrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinCtrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
