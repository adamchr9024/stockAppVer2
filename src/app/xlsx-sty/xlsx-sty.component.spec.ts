import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RapidapiService } from '../rapidapi.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { XlsxStyComponent } from './xlsx-sty.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
describe('XlsxStyComponent', () => {
  let component: XlsxStyComponent;
  let fixture: ComponentFixture<XlsxStyComponent>;
  let mockRapidApiService;
  let securitys = [
    { "priceEpsCurrentYear": 35.588608, "bookValue": 4.431, "fiftyDayAverage": 243.541, "fiftyDayAverageChange": 19.907211, "fiftyDayAverageChangePercent": 0.0817407, "twoHundredDayAverage": 222.37805, "twoHundredDayAverageChange": 41.07016, "twoHundredDayAverageChangePercent": 0.18468621, "marketCap": 3909674074112, "forwardPE": 31.70255, "priceToBook": 59.455696, "sourceInterval": 15, "exchangeDataDelayedBy": 0, "averageAnalystRating": "2.0 - Buy", "tradeable": false, "cryptoTradeable": false, "regularMarketChangePercent": 1.4901862, "regularMarketPrice": 263.4482, "marketState": "REGULAR", "hasPrePostMarketData": true, "firstTradeDateMilliseconds": 345479400000, "priceHint": 2, "regularMarketChange": 3.868225, "regularMarketDayHigh": 264.13, "regularMarketDayRange": "259.18 - 264.13", "regularMarketDayLow": 259.18, "regularMarketVolume": 25871653, "regularMarketPreviousClose": 259.58, "bid": 263.43, "ask": 263.29, "bidSize": 1, "askSize": 1, "fullExchangeName": "NasdaqGS", "financialCurrency": "USD", "regularMarketOpen": 261.19, "averageDailyVolume3Month": 54759101, "averageDailyVolume10Day": 47327910, "fiftyTwoWeekLowChange": 94.238205, "fiftyTwoWeekLowChangePercent": 0.5569304, "fiftyTwoWeekRange": "169.21 - 265.29", "fiftyTwoWeekHighChange": -1.8417969, "fiftyTwoWeekHighChangePercent": -0.006942579, "fiftyTwoWeekLow": 169.21, "fiftyTwoWeekHigh": 265.29, "fiftyTwoWeekChangePercent": 12.1732, "dividendDate": 1755129600, "trailingAnnualDividendRate": 1.01, "trailingPE": 39.976967, "dividendRate": 1.04, "trailingAnnualDividendYield": 0.0038909009, "dividendYield": 0.4, "epsTrailingTwelveMonths": 6.59, "epsForward": 8.31, "epsCurrentYear": 7.4026, "shortName": "Apple Inc.", "longName": "Apple Inc.", "displayName": "Apple", "symbol": "AAPL" },
    { "fiftyDayAverage": 20.4252, "fiftyDayAverageChange": 0.30480003, "fiftyDayAverageChangePercent": 0.014922745, "twoHundredDayAverage": 19.30565, "twoHundredDayAverageChange": 1.4243488, "twoHundredDayAverageChangePercent": 0.07377885, "netExpenseRatio": 1.48, "sourceInterval": 15, "exchangeDataDelayedBy": 0, "tradeable": false, "cryptoTradeable": false, "regularMarketChangePercent": 0.4360465, "regularMarketPrice": 20.73, "marketState": "REGULAR", "hasPrePostMarketData": false, "firstTradeDateMilliseconds": 867677400000, "priceHint": 2, "regularMarketChange": 0.09, "regularMarketPreviousClose": 20.64, "fullExchangeName": "Nasdaq", "averageDailyVolume3Month": 0, "averageDailyVolume10Day": 0, "fiftyTwoWeekLowChange": 3.7299995, "fiftyTwoWeekLowChangePercent": 0.21941173, "fiftyTwoWeekRange": "17.0 - 20.73", "fiftyTwoWeekHighChange": 0, "fiftyTwoWeekHighChangePercent": 0, "fiftyTwoWeekLow": 17, "fiftyTwoWeekHigh": 20.73, "fiftyTwoWeekChangePercent": 7.6323986, "dividendRate": 0.13504, "dividendYield": 2.07, "ytdReturn": 11.71071, "trailingThreeMonthReturns": 5.13476, "netAssets": 5208834000, "shortName": "JPMorgan Investor Growth and In", "longName": "JPMorgan Investor Growth & Income C", "messageBoardId": "finmb_28117639", "exchangeTimezoneName": "America\/New_York", "exchangeTimezoneShortName": "EDT", "gmtOffSetMilliseconds": -14400000, "market": "us_market", "esgPopulated": false, "symbol": "ONECX" }
  ]
  beforeEach(async () => {
    mockRapidApiService = jasmine.createSpyObj("RapidapiService", ['getMutualFundPrices']);

    mockRapidApiService.getMutualFundPrices.and.returnValue(of(securitys));

    await TestBed.configureTestingModule({
      imports: [XlsxStyComponent],
      providers: [HttpClient, HttpHandler]
    })
      .compileComponents();
    TestBed.overrideProvider(RapidapiService, { useValue: mockRapidApiService });
    fixture = TestBed.createComponent(XlsxStyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /*
  it('should upload spread sheet successfully', async () => {
    //https://stackoverflow.com/questions/55356093/how-to-write-the-unit-testing-for-the-file-upload-method-in-the-angular-7-or-2
    //let html = '/home/chris/Documents/stocklibretest.html';  //works
    //let inputDebugEl1;
    try {
      //      let fileString = 'file:///../../securities_test.ods'
      //let fileString = 'file:///media/chris/Windows/PorcademyTypescript/StockAppNg18/securities_test.ods'
      let fileString = '/media/chris/Windows/PorcademyTypescript/StockAppNg18/public/Stocks.json'

      //let res = await fetch(fileString);
      //res.
      // console.log("response", res.text())
      let securitys2 = await fetch(fileString).then(res => {
        //console.log("res", res);
        return res.json();
      });
      // let blog  = new Blob(JSON.stringify(securitys).);
      let file = new File([securitys2], "security.ods")
      const dataTransfer = new DataTransfer();
      //dataTransfer.dropEffect="none"; 
      //dataTransfer.effectAllowed="copy";
      // dataTransfer.items.add(file);
      // console.log("dataTransfer files", dataTransfer.files) //
      // console.log("dataTransfer data", dataTransfer.getData)
      const inputDebugEl = fixture.debugElement.query(By.css('input[type=file]'));
      //inputDebugEl1 = fixture.debugElement.query(ele => ele.name == "inputfile")
      console.log("input element", inputDebugEl);
      inputDebugEl.nativeElement.files = dataTransfer.files;
      inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'))
    }
    catch (err: any) {
      console.log("error caught in xlsx-style test ", err)
      //throw err;
    }
    // if (inputDebugEl1) {
    //  inputDebugEl.nativeElement.dispatchEvent(new InputEvent('change'));
    //}

    fixture.detectChanges();
    expect(component.stocksArray.length).toBe(3)   //should be 2
    // expect(component.uploadedFile).toBeTruthy()
    // expect(component.uploadedFile).toBe('test-file.pdf')

  })
    */
  /* it('should export file successfully on button click', () => {
     //click export button
     // component.exportToOds()
     //verify contents of XLSXStyle
   });*/
  it("fetch security data and load in table on Refresh/Update Data button click", () => {
    //upload the test file
    //mock this.rapidApiService.getMutualFundPrices(moresymbols) //done above
    //upload a .ods document.
    component.callYahoo();
    //validate value in stockmaps
    fixture.detectChanges();
    expect(component.stocksmap.size).toBe(3);//should be 2
    //get table body <td> data with query  and validate AAPL data
    //verify content of table in html
    //
  })
  /*it('should select a file', () => {
    const file = new File([''], 'test-file.txt');
    const event = { target: { files: [file] } };
    const inputDebugEl = fixture.debugElement.query(By.css('input[type=file]'))
    // console.log("inputElement.nativeElement", inputDebugEl.nativeElement)
    inputDebugEl.nativeElement.files = new FileList().item
    inputDebugEl.nativeElement.dispatchEvent(new Event('change'))
    //expect(inputDebugEl.nativeElement.selectedFile).toEqual(file);
    fixture.detectChanges();
    expect(inputDebugEl.nativeElement.value).toEqual('test-file.txt');

  });*/
  //https://stackoverflow.com/questions/51970681/angular-jasmine-unit-test-change-event-for-inputtype-file
  it('should call onFileChange() when files manually selected with the file input', () => {
    spyOn(component, 'onFileChange').and.callThrough();
    //  spyOn(component, "createSecurity").and.callThrough();
    fixture.detectChanges();

    const file = new File(['this is file content!'], 'dummy.txt');
    const dt = new DataTransfer();
    dt.items.add(file);
    // dt.items.add(file);

    const inputElDebug = fixture.debugElement.query(By.css('input[type="file"]'));
    const inputEl: HTMLInputElement = inputElDebug.nativeElement;
    inputEl.files = dt.files;

    const changeEvent = new Event('change');
    inputEl.dispatchEvent(changeEvent);

    fixture.detectChanges();
    // expect(component.createSecurity).toHaveBeenCalled();
    expect(component.onFileChange).toHaveBeenCalled();
    expect(inputEl.value).toEqual('C:\\fakepath\\dummy.txt');
    //expect(component.onFileSelect).toHaveBeenCalledWith(changeEvent);
  });
});
