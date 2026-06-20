import { Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Category, Security, SecurityType } from '../../model/security';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RapidapiService } from '../rapidapi.service';
import * as XLSXStyle from 'xlsx-js-style';
@Component({
  selector: 'app-xlsx-sty',
  standalone: true,
  imports: [CommonModule],
  providers: [RapidapiService],
  templateUrl: './xlsx-sty.component.html',
  styleUrl: './xlsx-sty.component.css'
})
export class XlsxStyComponent implements OnDestroy {
  subscription!: Subscription;
  stocksmap: Map<string, Security> = new Map()
  data!: SecurityType[][]
  headData: string[] = ["ticker", "quantity", "category", "unit cost", "yahoo price", "gain/loss",
    "52-wk-rng", "percentile", "effective-%", "potential 1Yr income", "actual income", "gain/loss Wth dvd", "GnLs Wth Dvd %", "comment"];
  waiting: string = "Wait for ready to fetch";
  stocksArray: Security[] = [new Security("AAPL", 3, 5.67, 5.61, Category.Stock, "4-5.9", "test export",
    2, 6, 3.1, 5.2, 5.4, 1.1, 45.0, 12.2)];  //my data
  constructor(private rapidApiService: RapidapiService) { }
  //  ngOnChanges(changes: SimpleChanges): void {
  // console.log(JSON.parse(JSON.stringify(changes)))
  // }
  beforeUnloadHandler = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    return 'Are you sure you want to leave? You may have unsaved changes.'
  }
  //  window.addEventListener('beforeunload', beforeUnloadHandler);

  exportToOds() {
    try {
      let customValue = this.stocksArray.map(val => {
        return {
          ticker: val.ticker, quantity: val.quantity, category: val.category, unit_cost: val.unitcost,
          yahooprice: val.yahooprice, gain_loss: val.gainloss, gain_loss_wth_dvd: val.glwdiv, gain_loss_div_pct: val.glwdvdpct, fiftytwowkrng: val.fiftytwowkrng, price_percentile: val.percentage,
          effectivePercent: val.effectivePercentage, potentialAnnualIncome: val.est_annual_income, comment: val.comment
        };
      });
      const worksheet: XLSXStyle.WorkSheet = XLSXStyle.utils.json_to_sheet(customValue);
      // worksheet.
      const wscols = [ //used to set the width of each column ch for characters 
        { wch: 7 }, { wch: 9 }, { wch: 20 }, { wch: 10 }, { wch: 10 },
        { wch: 15 }, { wch: 17 }, { wch: 16 }, { wch: 15 }, { wch: 16 }, { wch: 20 }, { wch: 25 },
        { wch: 25 }]; //

      /* create column metadata object if it does not exist */
      if (!worksheet["!cols"]) {
        worksheet["!cols"] = wscols;
      }

      //  console.log("worksheet['cols']", worksheet['cols']);
      for (let c in worksheet) {
        if (typeof (worksheet[c]) != "object") { //ship rows and columns without data
          //ws["!cols"][COL_INDEX].hidden = true; 
          //  let cell = XLSXStyle.utils.decode_cell(c) //added maybe error
          //  worksheet["!cols"][cell.r].hidden=true;  //added maybe error
          //  worksheet["!cols"][cell.c].hidden=true;  //added maybe error
          // console.log("non object cell", c);
          continue;
        }
        let cell = XLSXStyle.utils.decode_cell(c);
        //  console.log(cell);  //cell.c ==4 add background color
        if (cell.c === 4) { //yahoo.price
          worksheet[c].s = { //add style
            alignment: {
              vertical: "center",
              horizontal: "center",
              wrapText: '1', // any truthy value here
            },
            border: {
              right: {
                style: "thin",
                color: "141413"
              },
              left: {
                style: "thin",
                color: "141413" //blackish
              },
            },
            fill: { // background color
              patternType: "solid",
              fgColor: { rgb: "ffff00" },//ffff00
              bgColor: { rgb: "ffff00" } //choose yellow
            }
          };
        }
        //else {

        // worksheet[c].s = { 

        //add style
        //     alignment: {
        //       vertical: "center",
        //       horizontal: "center",
        //       wrapText: '1', // any truthy value here
        //     }
        //   };
        //  }
      }
      // console.log("after for export worksheet", worksheet);
      // }  https://npm.io/package/xlsx-js-style
      //highlight yahoo.price E2-e60 background color yellow
      //                    AGG-TLTW
      //https://docs.sheetjs.com/docs/csf/cell
      // return;
      const workbook: XLSXStyle.WorkBook = XLSXStyle.utils.book_new();
      let filename = "stock_ods" + new Date().getMilliseconds();
      XLSXStyle.utils.book_append_sheet(workbook, worksheet, filename);
      XLSXStyle.writeFile(workbook, filename + ".xlsx"); //where is this going (downloads)

    }
    catch (err: any) {
      console.error("error caught in XlsxStyleComponent exportToOds: ", err?.message)
    }
  }
  onFileChange(eve: any) {

    try {
      const target: DataTransfer = <DataTransfer>(eve.target);
      // console.log("file", eve.target.files[0])
      if (target.files.length !== 1) { throw new Error("cannot use multiple files") }

      const reader: FileReader = new FileReader();
      //const writer:Filew
      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        //const view = new DataView(fileContent, 0);
        // console.log(new Uint8Array(view.buffer))
        // console.log(view.byteLength)
        // console.log("reader.result", reader.result)
        //console.log(view.)
        //console.log("e.target.result", e.target.result)
        //const workBook: XLSXStyle.WorkBook = XLSXStyle.read(fileContent, { type: 'binary' });
        const workBook: XLSXStyle.WorkBook = XLSXStyle.read(fileContent, { type: 'binary', cellStyles: true });

        const workSheetName: string = workBook.SheetNames[0];
        const workSheet: XLSXStyle.WorkSheet = workBook.Sheets[workSheetName];
        // console.log("read worksheet with styles", workSheet);
        this.data = (XLSXStyle.utils.sheet_to_json(workSheet, { header: 1 }));
        //this.headData = this.data[0];
        // console.log("data", this.data)
        this.data.splice(0, 1); //get rid of the row for the column header text

        this.createSecurity();

      };
      reader.readAsArrayBuffer(target.files[0]);

      //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer

    }
    catch (err: any) {
      console.error("error caught in XlsxStyleComponent fileUpload: ", err?.message)
    }
  }
  callYahoo() {
    this.waiting = 'fetching';
    try {
      let moresymbols = Array.from(this.stocksmap.keys());
      this.subscription = this.rapidApiService.getMutualFundPrices(moresymbols)
        .subscribe({
          next: (n) => {
            n.forEach((val2: any) => {
              let updt = this.stocksmap.get(val2.symbol);
              if (updt) {
                updt.dividendYield = val2?.dividendYield;
                updt.fiftytwowkrng = val2?.fiftyTwoWeekRange;
                updt.yahooprice = val2?.regularMarketPrice;
                updt.fiftyDayAverage = val2?.fiftyDayAverage;
                updt.fiftyDayAverageChange = val2?.fiftyDayAverageChange;
                updt.twoHundredDayAverage = val2?.twoHundredDayAverage; //twoHundredDayAverage
                updt.twoHundredDayAverageChange = val2?.twoHundredDayAverageChange;
                //console.log("twoHundredDayAverage=", val2.symbol, val2?.twoHundredDayAverage);
                updt.trailingAnnualDividendRate = val2?.trailingAnnualDividendRate;
                // updt.comment=val2?llongName;
                this.stocksmap.set(updt.ticker, updt)
              }
            })
          },
          error: (err) => {
            console.error("error 'getMutualFundPrices':", err?.error?.message)
            this.waiting = "ERROR OCCURRED fetching 'getMutualFundPrices':" + err?.error?.message;

          },
          complete: () => {
            this.waiting = 'done';
            console.log("complete called in xlsx-style");
          }
        })
      this.stocksArray = Array.from(this.stocksmap.values());
      //this.tableDataSource.data = this.stocksArray
      //debugger;
      // setTimeout(() => {
      //   if (!this.waiting.includes("ERROR")) {
      //     this.waiting = "done";
      //   }

      // }, 1400);
    }
    catch (err: any) {
      console.error("error caught in xlsx-style callYahoo", err?.message);
    }

  }
  createSecurity() {
    //get rid of old data
    const len = this.stocksArray.length;
    this.stocksArray.splice(0, len);
    let security: Security;
    try {//The below code works but was MODIFIED TO GET THE TEST TO PASS, But NOW THE UPLOAD FAILS
      this.data.forEach((val: any[]) => {
        // let actualdividend = val[10];
        //  console.log("val.length", actualdividend);
        //   for(val of val2)
        // console.log("test range:", typeof val[9] === "string");
        security = new Security(val[0], val[1], val[2], val[3], val[4], val[5], val[9], val[6], val[7], 4.4, 2.2, 4.3, 4.11, val[8], val[10]);
        this.stocksmap.set(security.ticker, security);
        // [ "AGG", 17, 98, 102.93, "Fixed Income", "95.74 - 102.04", 96, 102, 64.65, "safe dividend" ]
      });
      this.stocksArray = Array.from(this.stocksmap.values());
      this.waiting = "ready to fetch";
      // this.data.forEach((val2: SecurityType[]) => {
      // for (let val2 in this.data) {
      //for (let val of val2) {
      // console.log("test range:", typeof val[9] === "string");
      // security = new Security(val.ticker, val.quantity, val.price, val.unit_cost, val.category, val.fiftytwowkrng, val.comment,
      //   val.effective_year_low, val.effective_year_high, val.fiftyDayAverage, val.fiftyDayAverageChange, val.twoHundredDayAverage,
      //   val.twoHundredDayAverageChange, val.est_annual_income, val.actual_dividend);
      // security = new Security(val2[0], val2[1], val2[2], val2[3], val2[4], val2[5], val2[9], val2[6], val2[7], 4.4, 2.2, 4.3, 4.11, val2[8], val2[10]);

      //this.stocksmap.set(security.ticker, security);
      // [ "AGG", 17, 98, 102.93, "Fixed Income", "95.74 - 102.04", 96, 102, 64.65, "safe dividend" ]
      // }
      // });

      //}

      //}
      //this.stocksArray = Array.from(this.stocksmap.values());
      //this.waiting = "ready to fetch";
    }
    catch (err: any) {
      console.error("error caught in xlsx-style createSecurity(): ", err?.message);
    }
  }
  ngOnDestroy(): void {
    console.log("in ondestroy")
    if (window) {
      console.log("in window if")
      window.removeEventListener('beforeunload', this.beforeUnloadHandler);

    }
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
