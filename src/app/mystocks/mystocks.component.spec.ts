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
  let mockRapidApiService = jasmine.createSpyObj("RapidapiService", ['getMutualFundPrices']);
  let mockSignalsService = jasmine.createSpyObj("SignalswatchlistService", ['readSecurities']);
  //let httpMock: HttpTestingController;

  //mock  this.signalsService.readSecurities('realwatchlist.json')
  // mock this.rapidApiService.getMutualFundPrices(moresymbols)
  beforeEach(async () => {
    jasmine.clock().install();
    mockRapidApiService.getMutualFundPrices.and.returnValue(of(test_securitys));
    mockSignalsService.readSecurities.and.returnValue(of(test_securityType))
    await TestBed.configureTestingModule({
      imports: [MystocksComponent],
      providers: [provideHttpClient(),
      provideHttpClientTesting(), RapidapiService, SignalswatchlistService]
    })
      .compileComponents();
    TestBed.overrideProvider(RapidapiService, { useValue: mockRapidApiService });
    TestBed.overrideProvider(SignalswatchlistService, { useValue: mockSignalsService });
    fixture = TestBed.createComponent(MystocksComponent);
    component = fixture.componentInstance;
    // httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  })

  /*it('should update the value after timeout', () => {
    component.startTimeout(); // This method uses setTimeout
    expect(component.value).toBe(false); // Initial value

    jasmine.clock().tick(5000); // Fast forward 5 seconds
    expect(component.value).toBe(true); // Value should now be updated
  });*/

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have yahoo price of 263.4482 for apple (AAPL) after fetch ', () => {
    component.initialize() //method usess setTimeOut
    jasmine.clock().tick(5000)
    fixture.detectChanges()
    //const { debugElement } = fixture;
    //const { nativeElement } = debugElement;
    // console.log("", nativeElement.tagName);
    // console.log(nativeElement.textContent);
    // console.log(nativeElement.innerHTML);
    let tdappleDb = fixture.debugElement.query(By.css('.bordergreen'));
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


