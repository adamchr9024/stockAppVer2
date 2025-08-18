import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsXlsxComponent } from './ods-xlsx.component';

describe('OdsXlsxComponent', () => {
  let component: OdsXlsxComponent;
  let fixture: ComponentFixture<OdsXlsxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdsXlsxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdsXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
