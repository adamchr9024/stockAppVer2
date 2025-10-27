import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
//import { RapidapiService } from './rapidapi.service';
import { Resolver1Resolver } from './resolver1.resolver';
import { Security } from '../model/security';
describe('resolver1Resolver', () => {
  const executeResolver: ResolveFn<Map<string, Security>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => Resolver1Resolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
