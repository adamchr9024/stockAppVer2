import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RapidapiService } from '../rapidapi.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { XlsxStyComponent } from './xlsx-sty.component';

describe('XlsxStyComponent', () => {
  let component: XlsxStyComponent;
  let fixture: ComponentFixture<XlsxStyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XlsxStyComponent],
      providers: [RapidapiService, HttpClient, HttpHandler]
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
