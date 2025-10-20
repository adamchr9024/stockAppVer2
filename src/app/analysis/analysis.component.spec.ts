import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RapidapiService } from '../rapidapi.service';
import { AnalysisComponent } from './analysis.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisComponent],
      providers: [RapidapiService, HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
