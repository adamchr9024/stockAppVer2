import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { inject } from '@angular/core';
import { test_securitys } from '../../model/security';
import { RapidapiService } from '../rapidapi.service';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { XlsxStyComponent } from './xlsx-sty.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
//import { SecurityType } from '../../model/security';
import { provideHttpClient, } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
describe('XlsxStyComponent', () => {
  let component: XlsxStyComponent;
  let fixture: ComponentFixture<XlsxStyComponent>;
  let mockRapidApiService = jasmine.createSpyObj("RapidapiService", ['getMutualFundPrices']);

  beforeEach(async () => {
    jasmine.clock().install();

    mockRapidApiService.getMutualFundPrices.and.returnValue(of(test_securitys));

    await TestBed.configureTestingModule({
      imports: [XlsxStyComponent],
      providers: [HttpClient, HttpHandler,
        provideHttpClient(), //must come first
        provideHttpClientTesting()]
    })
      .compileComponents();
    TestBed.overrideProvider(RapidapiService, { useValue: mockRapidApiService }); //may need to move to it
    fixture = TestBed.createComponent(XlsxStyComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  })
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
  it("fetch security data and load in table on Refresh/Update Data button click", async () => {
    let http: HttpClient;
    const file = "stocktest.json"
    let httpheader = new HttpHeaders();
    httpheader = httpheader.append("accepts", "application/json");
    await TestBed.runInInjectionContext(() => {
      // Your test code here where you can access injected services
      http = TestBed.inject(HttpClient);
      http.get(file, { headers: httpheader }).subscribe((dat) => {
        console.log("data", dat);
      })
    })
    // need to mock createSecurity method or this.data



    //mock this.rapidApiService.getMutualFundPrices(moresymbols) //done above
    //upload a .ods document.
    component.callYahoo(); //method has setTimeout()
    jasmine.clock().tick(5000)
    //validate value in stockmaps
    fixture.detectChanges();
    expect(component.stocksmap.size).toBe(3);//should be 2
    expect(mockRapidApiService.getMutualFundPrices).toHaveBeenCalled();
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
