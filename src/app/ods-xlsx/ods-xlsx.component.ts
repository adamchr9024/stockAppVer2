import { Component, OnDestroy } from '@angular/core';
import * as XLSX from "xlsx";
import { Category, Security, SecurityType } from '../../model/security';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RapidapiService } from '../rapidapi.service';
//import { WindowRef } from "@angular/platform-browser"
//https://www.youtube.com/watch?v=PBpcM2xRHj0    EXPORT
//https://www.youtube.com/watch?v=qjuJRYm68mw    IMPORT


@Component({
  selector: 'app-ods-xlsx',
  standalone: true,
  imports: [CommonModule],
  providers: [RapidapiService],
  templateUrl: './ods-xlsx.component.html',
  styleUrl: './ods-xlsx.component.css'
})
export class OdsXlsxComponent implements OnDestroy {
  window!: Window
  subscription!: Subscription;
  stocksmap: Map<string, Security> = new Map()
  data!: SecurityType[][];
  headData: string[] = ["ticker", "quantity", "category", "unit cost", "yahoo price", "gain/loss",
    "52-wk-rng", "percentile", "effective-%", "potential annual income", "comment"];
  waiting: string = "Wait for ready to fetch";
  stocksArray: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9", "test export",
    2, 6, 3.1, 5.2, 5.4, 1.1, 45.0)];  //my data

  constructor(private rapidApiService: RapidapiService) { }
  /* const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
         event.preventDefault();
        return 'Are you sure you want to leave? You may have unsaved changes.'
    }
       window.addEventListener('beforeunload', beforeUnloadHandler);
 */
  exportToOds() {
    try {
      let customValue = this.stocksArray.map(val => {
        return {
          ticker: val.ticker, quantity: val.quantity, category: val.category, unit_cost: val.unitcost,
          yahooprice: val.yahooprice, gain_loss: val.gainloss, fiftytwowkrng: val.fiftytwowkrng, percentile: val.percentage,
          effectivePercent: val.effectivePercentage, potentialAnnualIncome: val.est_annual_income, comment: val.comment
        };
      });



      //console.log(JSON.stringify(customValue))
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(customValue);
      //console.log("export worksheet", worksheet);
      for (let c in worksheet) {
        if (typeof (worksheet[c]) != "object") continue;
        let cell = XLSX.utils.decode_cell(c);
        //console.log(cell);  //cell.c ==4 add background color
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
      }
      //console.log("after for export worksheet", worksheet);
      // }  https://npm.io/package/xlsx-js-style
      //highlight yahoo.price E2-e60 background color yellow
      //                    AGG-TLTW
      //https://docs.sheetjs.com/docs/csf/cell
      //https://stackoverflow.com/questions/50147526/sheetjs-xlsx-cell-styling
      //https://www.npmjs.com/package/xlsx-style
      //https://www.npmjs.com/package/xlsx-style
      // return;
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      let filename = "stock_ods" + new Date().getMilliseconds();
      XLSX.utils.book_append_sheet(workbook, worksheet, filename);
      XLSX.writeFile(workbook, filename + ".xlsx"); //where is this going (downloads)
    }
    catch (err: any) {
      console.log("error caught in exportToOds: ", err?.message)
    }
  }
  onFileChange(eve: any) {

    try {
      const target: DataTransfer = <DataTransfer>(eve.target);
      if (target.files.length !== 1) { throw new Error("cannot use multiple files") }
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        //const workBook: XLSX.WorkBook = XLSX.read(fileContent, { type: 'binary' });
        const workBook: XLSX.WorkBook = XLSX.read(fileContent, { type: 'binary', cellStyles: true });

        const workSheetName: string = workBook.SheetNames[0];
        const workSheet: XLSX.WorkSheet = workBook.Sheets[workSheetName];
        // console.log("read worksheet with styles", workSheet);
        this.data = (XLSX.utils.sheet_to_json(workSheet, { header: 1 }));
        //this.headData = this.data[0];

        this.data.splice(0, 1);
        //console.log(this.data);
        //this.createSecurity();
        this.createSecurity4loop();

      };
      reader.readAsArrayBuffer(target.files[0]);
      //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer

    }
    catch (err: any) {
      console.log("error caught in fileUpload: ", err?.message)
    }
  }
  callYahoo() {
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
                updt.trailingAnnualDividendRate = val2?.trailingAnnualDividendRate;
                this.stocksmap.set(updt.ticker, updt)
              }
            })
          },
          error: (err) => {
            console.log("error 'getMutualFundPrices':", err?.error?.message)
            this.waiting = "ERROR OCCURRED fetching 'getMutualFundPrices':" + err?.error?.message;

          },
          complete: () => { console.log("complete called in ods-xlsx") }
        })
      this.stocksArray = Array.from(this.stocksmap.values());
      setTimeout(() => {
        if (!this.waiting.includes("ERROR")) {
          this.waiting = "done";
        }

      }, 1400);
    }
    catch (err: any) {
      console.log("error caught in callYahoo", err?.message);
    }

  }
  createSecurity() {
    let security: Security;
    try {
      this.data.forEach((val: any[]) => {
        security = new Security(val[0], val[1], val[2], val[3], val[4], val[5], val[9], val[6], val[7], 4.4, 2.2, 4.3, 4.11, val[8]);
        this.stocksmap.set(security.ticker, security);
        // [ "AGG", 17, 98, 102.93, "Fixed Income", "95.74 - 102.04", 96, 102, 64.65, "safe dividend" ]
      });
      this.stocksArray = Array.from(this.stocksmap.values());
      this.waiting = "ready to fetch";
    }
    catch (err: any) {
      console.log("error caught in createSecurity(): ", err?.message);
    }
  }
  createSecurity4loop() {
    let security: Security;
    let val: any[]
    try {
      for (val of this.data) {
        let val2: SecurityType = {
          ticker: val[0], quantity: val[1], price: val[2], unit_cost: val[3], category: val[4], fiftytwowkrng: val[5], comment: val[6],
          effective_year_low: val[7], effective_year_high: val[8], fiftyDayAverage: val[9], fiftyDayAverageChange: val[10], twoHundredDayAverage: val[11], twoHundredDayAverageChange: val[12],
          est_annual_income: val[13], actual_dividend: val[14]
        }
        security = Security.getSecurityFromSecurityType(val2);
        this.stocksmap.set(security.ticker, security);
        // [ "AGG", 17, 98, 102.93, "Fixed Income", "95.74 - 102.04", 96, 102, 64.65, "safe dividend" ]
        // }
      };
      this.stocksArray = Array.from(this.stocksmap.values());
      this.waiting = "ready to fetch";
    }
    catch (err: any) {
      console.log("error caught in createSecurity(): ", err?.message);
    }
  }
  ngOnDestroy(): void {
    console.log("in ondestroy")
    if (this.subscription) { this.subscription.unsubscribe(); }
    if (window) {
      console.log("in window if")
      //window.removeEventListener<"beforeunload">()
      //  window.removeEventListener('beforeunload', this.beforeUnloadHandler);
      // window.removeEventListener("beforeunload", handleBeforeDown, { passive: true });
    }
  }

}
