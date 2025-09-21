import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { resolver1Resolver } from './resolver1.resolver';

describe('resolver1Resolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => resolver1Resolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
