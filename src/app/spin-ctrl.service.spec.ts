import { TestBed } from '@angular/core/testing';

import { SpinCtrlService } from './spin-ctrl.service';

fdescribe('SpinCtrlService', () => {
  let service: SpinCtrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinCtrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("show spinner", () => {
    service.ShowAndString.next({ displaySpinner: true, doneStatus: "fetching" })
    service.ShowAndString.subscribe(next => {
      expect(next).toEqual({ displaySpinner: false, doneStatus: "fetching" })
    })

  })
  it("hide spinner", () => {
    service.ShowAndString.next({ displaySpinner: false, doneStatus: "done" })
    //  let expectedValue;
    service.ShowAndString.subscribe(next => {
      expect(next).toEqual({ displaySpinner: true, doneStatus: "done" })
    })

  })
  /**
   * ng-virtual-main.js!=!data:text/javascript;base64, - Error: Module build failed (from ./node_modules/@ngtools/webpack/src/ivy/index.js):
  Error: data:text/javascript;base64, is missing from the TypeScript compilation. Please make sure it is in your tsconfig via the 'files' or 'include' property.
  TYPESCRIPT VERSION PROBLEM???
   */

});
