import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SpreadshtComponent } from './spreadsht.component';
//import { RapidapiService } from '../rapidapi.service';
import { SignalswatchlistService } from '../signalswatchlist.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RapidApiGets, SignalServiceGets } from '../../utility/rapidApiGets';
describe('SpreadshtComponent', () => {
  let component: SpreadshtComponent;
  let fixture: ComponentFixture<SpreadshtComponent>;
  let signalServiceGet: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpreadshtComponent],
      providers: [HttpClient, HttpHandler, provideAnimations(), RapidApiGets, SignalServiceGets]
    })
      .compileComponents();               //SignalswatchlistService
    //https://stackoverflow.com/questions/48234781/spyon-service-function-call-in-constructor
    signalServiceGet = TestBed.get(SignalServiceGets);
    spyOn(signalServiceGet, 'getSecurityByFileName').and.callThrough();


    fixture = TestBed.createComponent(SpreadshtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should load securities SignalServiceGets", () => {
    expect(signalServiceGet.getSecurityByFileName).toHaveBeenCalled()
  })


});
