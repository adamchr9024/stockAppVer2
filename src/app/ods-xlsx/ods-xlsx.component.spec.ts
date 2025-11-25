import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Category, Security, SecurityType, test_securityType, test_securitys } from '../../model/security';
import { OdsXlsxComponent } from './ods-xlsx.component';
import { RapidapiService } from '../rapidapi.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
const stocksArray: Security[] = [new Security("AAPL", 3, 5.67, 5.61, Category.Stock, "4-5.9", "test export",
  2, 6, 3.1, 5.2, 5.4, 1.1, 45.0, 12.2), new Security("ONECX", 4, 18, 20.1, Category.MutualFund, "17-20.7", "growth fund",
    2, 6, 3.1, 5.2, 5.4, 1.1, 41.54, 125)];


describe('OdsXlsxComponent', () => {
  let component: OdsXlsxComponent;
  let fixture: ComponentFixture<OdsXlsxComponent>;
  let mockRapidApiService = jasmine.createSpyObj("RapidapiService", ['getMutualFundPrices']);

  beforeEach(async () => {
    jasmine.clock().install();
    mockRapidApiService.getMutualFundPrices.and.returnValue(of(test_securitys));

    await TestBed.configureTestingModule({
      imports: [OdsXlsxComponent],
      providers: [RapidapiService, HttpClient, HttpHandler]
    })
      .compileComponents();
    TestBed.overrideProvider(RapidapiService, { useValue: mockRapidApiService });
    fixture = TestBed.createComponent(OdsXlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should update data when update button is clicked ", () => {// not working as expected


    spyOn(component, 'callYahoo').and.callThrough();
    spyOn(component, "createSecurity4loop").and.callThrough()
    component.stocksArray = stocksArray;
    fixture.detectChanges();
    component.data = [test_securityType];
    fixture.detectChanges();
    component.createSecurity4loop();//load data in stocksmaps 

    fixture.detectChanges();

    expect(component.stocksmap.size).toBe(2);
    expect(component.stocksArray.length).toBe(2);// actually 2
    //get update button and call click event
    const fetchButton = fixture.debugElement.query(By.css('[data-testid="fetch-button"]'));
    expect(fetchButton).toBeTruthy();
    //  const { debugElement } = fixture;
    // const { nativeElement } = debugElement;

    debugger;
    fetchButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    jasmine.clock().tick(5000)
    fixture.detectChanges();

    expect(component.createSecurity4loop).toHaveBeenCalled()
    expect(component.callYahoo).toHaveBeenCalled();
    expect(mockRapidApiService.getMutualFundPrices).toHaveBeenCalled();

    let tdappleDb = fixture.debugElement.query(By.css('.bordergreen'));

    expect(tdappleDb.nativeElement.textContent.trim()).toBe('263.4482');
    console.log("td with class bordergreen text:", tdappleDb);

  })

});
