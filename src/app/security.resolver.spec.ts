import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { securityResolver } from './security.resolver';

describe('securityResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => securityResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
