import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { HttpClient, HttpHandler } from '@angular/common/http';
import { provideHttpClient, } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MystocksComponent } from './mystocks.component';
import { RapidapiService } from '../rapidapi.service';
import { SignalswatchlistService } from '../signalswatchlist.service';
import { test_securitys, test_securityType } from '../../model/security';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';
//import { HttpClientModule } from '@angular/common/http';
describe('MystocksComponent', () => {

  let component: MystocksComponent;
  let fixture: ComponentFixture<MystocksComponent>;
  let mockRapidApiService;
  let mockSignalsService;
  //let httpMock: HttpTestingController;

  //mock  this.signalsService.readSecurities('realwatchlist.json')
  // mock this.rapidApiService.getMutualFundPrices(moresymbols)
  beforeEach(async () => {
    mockRapidApiService = jasmine.createSpyObj("RapidapiService", ['getMutualFundPrices']);
    mockRapidApiService.getMutualFundPrices.and.returnValue(of(test_securitys));
    mockSignalsService = jasmine.createSpyObj("SignalswatchlistService", ['readSecurities']);
    mockSignalsService.readSecurities.and.returnValue(of(test_securityType))
    await TestBed.configureTestingModule({
      imports: [MystocksComponent],
      providers: [provideHttpClient(),
      provideHttpClientTesting(), RapidapiService, SignalswatchlistService]
    })
      .compileComponents();
    // TestBed.overrideProvider(RapidapiService, { useValue: mockRapidApiService });
    // TestBed.overrideProvider(SignalswatchlistService, { useValue: mockSignalsService });
    fixture = TestBed.createComponent(MystocksComponent);
    component = fixture.componentInstance;
    // httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have yahoo price of 263.4482 for apple (AAPL) after fetch ', () => {
    // mockRapidApiService = jasmine.createSpyObj("RapidapiService", ['getMutualFundPrices']);
    //mockRapidApiService.getMutualFundPrices.and.returnValue(of(test_securitys));
    //mockSignalsService = jasmine.createSpyObj("SignalswatchlistService", ['readSecurities']);
    //mockSignalsService.readSecurities.and.returnValue(of(test_securityType))
    //TestBed.overrideProvider(RapidapiService, { useValue: mockRapidApiService });
    //TestBed.overrideProvider(SignalswatchlistService, { useValue: mockSignalsService });
    //get component
    // fixture.whenStable().then(() => {
    fixture.detectChanges()
    let tdappleDb = fixture.debugElement.query(By.css('td.bordergreen'));
    //const element = fixture.querySelector('.bordergreen');
    //console.log("element textContent", element)
    console.log("td with class bordergreen", tdappleDb);
    expect(tdappleDb.nativeElement.textContent).toEqual('263.4482')
    // const inputDebugEl = fixture.debugElement.query(By.css('input[type=file]'));
    expect(mockRapidApiService.getMutualFundPrices).toHaveBeenCalled();
    expect(mockSignalsService.readSecurities).toHaveBeenCalled();
    //  })
  })
});


