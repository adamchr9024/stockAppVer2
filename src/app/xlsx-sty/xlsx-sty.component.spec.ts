import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsxStyComponent } from './xlsx-sty.component';

describe('XlsxStyComponent', () => {
  let component: XlsxStyComponent;
  let fixture: ComponentFixture<XlsxStyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XlsxStyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XlsxStyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
