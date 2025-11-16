import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { inject } from '@angular/core';
import { Category, Security, SecurityType, test_securityType, test_securitys } from '../../model/security';
import { RapidapiService } from '../rapidapi.service';
//import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { XlsxStyComponent } from './xlsx-sty.component';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';
//import { SecurityType } from '../../model/security';
import { provideHttpClient, } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
//import { SimpleChange, SimpleChanges } from '@angular/core';


const stocksArray: Security[] = [new Security("AAPL", 3, 5.67, 5.61, Category.Stock, "4-5.9", "test export",
  2, 6, 3.1, 5.2, 5.4, 1.1, 45.0, 12.2), new Security("ONECX", 4, 18, 20.1, Category.MutualFund, "17-20.7", "growth fund",
    2, 6, 3.1, 5.2, 5.4, 1.1, 41.54, 125)];
describe('XlsxStyComponent', () => { //
  let component: XlsxStyComponent;
  let fixture: ComponentFixture<XlsxStyComponent>;
  let mockRapidApiService = jasmine.createSpyObj("RapidapiService", ['getMutualFundPrices']);
  //let http: HttpClient;
  beforeEach(async () => {
    jasmine.clock().install();

    mockRapidApiService.getMutualFundPrices.and.returnValue(of(test_securitys));
    //mockRapidApiService.getMutualFundPrices(['AAPL', 'ONECX']).and.returnValue(of(test_securitys));
    await TestBed.configureTestingModule({
      imports: [XlsxStyComponent],
      providers: [
        provideHttpClient(), //must come first
        provideHttpClientTesting(),
        RapidapiService]
    })
      .compileComponents();
    TestBed.overrideProvider(RapidapiService, { useValue: mockRapidApiService }); //may need to move to it
    fixture = TestBed.createComponent(XlsxStyComponent);
    component = fixture.componentInstance;
    // http = TestBed.inject(HttpClient)
    fixture.detectChanges();
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it("should update data when update button is clicked ", () => {// not working as expected
    //initialize 
    //spyOn(component, 'onFileChange').and.callThrough();
    spyOn(component, 'callYahoo').and.callThrough();
    component.stocksArray = stocksArray;
    //component.waiting = "done"
    fixture.detectChanges();
    //console.log("for debugger")
    // debugger;
    expect(component.stocksArray.length).toBe(2);// actually 2
    //get update button and call click event
    const fetchButton = fixture.debugElement.query(By.css('[data-testid="fetch-button"]'));
    expect(fetchButton).toBeTruthy();
    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    // console.log("tagname", nativeElement.tagName);
    //console.log("textcontent", nativeElement.textContent);

    // component.callYahoo();
    //fetchButton.nativeElement.dispatchEvent(new Event('click'));
    // fetchButton.nativeElement.click();
    debugger;
    fetchButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    //debugger;



    jasmine.clock().tick(5000)
    fixture.detectChanges();
    //console.log("detect changes", changes);
    // console.log("tagname", nativeElement.tagName);
    // console.log("textcontent", nativeElement.textContent);
    //console.log("innerHtml", nativeElement.innerHTML);
    // debugger;

    //console.log("element textContent", element)


    // expect(tdappleDb.nativeElement.textContent).toEqual('2.4482')

    // verify yahoo price for aapl
    expect(component.callYahoo).toHaveBeenCalled();
    expect(mockRapidApiService.getMutualFundPrices).toHaveBeenCalled();
    //expect(mockRapidApiService.getMutualFundPrices).toHaveBeenCalledWith(['AAPL', 'ONECX']);

    let tdappleDb = fixture.debugElement.query(By.css('.bordergreen'));

    expect(tdappleDb.nativeElement.textContent).toEqual('263.4482');
    console.log("td with class bordergreen text:", tdappleDb);
    //mockRapidApiService
    // console.log("innerHtml", nativeElement.innerHTML);
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
  // it("fetch security data and load in table on Refresh/Update Data button click", () => { //do later
  it("after loading  securities , verify  size in to data Array<Array<Security>>", () => { //do later

    //let http: HttpClient;
    // let thearray = [];
    // const file = "stocktest.json"
    // let httpheader = new HttpHeaders();
    // httpheader = httpheader.append("accepts", "application/json");
    //await TestBed.runInInjectionContext(() => {
    // Your test code here where you can access injected services
    // http = TestBed.inject(HttpClient);
    // http.get<SecurityType[]>(file, { headers: httpheader }).subscribe((dat) => {
    //  console.log("data", dat);
    //  thearray = dat;
    // expect(dat.length).toBe(2) //3
    //})
    // })
    // need to mock createSecurity method or this.data
    //jasmine.clock().tick(5000)
    //expect(thearray.length).toBe(2) //3

    spyOn(component, 'createSecurity').and.callThrough();
    //debugger; //todo remove    
    // let arr: SecurityType[] = [];
    //test_securityType.forEach(ele => arr.push(ele))
    //let arr2: SecurityType[][] = [[]]
    //arr2.push(arr)
    component.data = [test_securityType];
    fixture.detectChanges()
    expect(component.data.length).toBe(1);
    // data!: Array<Array<SecurityType>>;
    //expect(component.data[0].length).toBe(2) //should be 2
    //component.createSecurity();
    //let changes = new SimpleChange(stocksArray, [test_securityType], true);
    //debugger;
    //component.ngOnChanges({ data: changes })


    //mock this.rapidApiService.getMutualFundPrices(moresymbols) //done above
    //upload a .ods document.
    //component.callYahoo(); //method has setTimeout()
    //jasmine.clock().tick(5000)
    //console.log("stocksmap size", component.stocksmap.size)
    //validate value in stockmaps
    // debugger;  //todo remove
    fixture.detectChanges();//LEARN HOW TO DEBUG

    expect(component.data[0].length).toBe(2);//should be 2
    component.createSecurity();
    fixture.detectChanges();
    expect(component.stocksmap.size).toBe(3)

    expect(component.createSecurity).toHaveBeenCalled();


    //expect(mockRapidApiService.getMutualFundPrices).toHaveBeenCalled();
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
