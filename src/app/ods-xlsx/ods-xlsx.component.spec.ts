import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsXlsxComponent } from './ods-xlsx.component';
import { RapidapiService } from '../rapidapi.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('OdsXlsxComponent', () => {
  let component: OdsXlsxComponent;
  let fixture: ComponentFixture<OdsXlsxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdsXlsxComponent],
      providers: [RapidapiService, HttpClient, HttpHandler]
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
