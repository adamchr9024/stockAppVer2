import { Component, OnDestroy } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Category, Security } from '../../model/security';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RapidapiService } from '../rapidapi.service';
import * as XLSXStyle from 'xlsx-js-style';
@Component({
  selector: 'app-xlsx-sty',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  providers: [RapidapiService],
  templateUrl: './xlsx-sty.component.html',
  styleUrl: './xlsx-sty.component.css'
})
export class XlsxStyComponent implements OnDestroy {
  subscription!: Subscription;
  stocksmap: Map<string, Security> = new Map()
  data!: [][];
  headData: string[] = ["ticker", "quantity", "category", "unit cost", "yahoo price", "gain/loss",
    "52-wk-rng", "percentile", "effective-%", "potential annual income", "comment"];
  waiting: string = "Wait for ready to fetch";
  stocksArray: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9", "test export",
    2, 6, 3.1, 5.2, 5.4, 1.1, 45.0)];  //my data
  constructor(private rapidApiService: RapidapiService) { }
  exportToOds() {
    try {
      let customValue = this.stocksArray.map(val => {
        return {
          ticker: val.ticker, quantity: val.quantity, category: val.category, unit_cost: val.unitcost,
          yahooprice: val.yahooprice, gain_loss: val.gainloss, fiftytwowkrng: val.fiftytwowkrng, percentile: val.percentage,
          effectivePercent: val.effectivePercentage, potentialAnnualIncome: val.annualIncome, comment: val.comment
        };
      });
      const worksheet: XLSXStyle.WorkSheet = XLSXStyle.utils.json_to_sheet(customValue);
      for (let c in worksheet) {
        if (typeof (worksheet[c]) != "object") continue;
        let cell = XLSXStyle.utils.decode_cell(c);
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
      // return;
      const workbook: XLSXStyle.WorkBook = XLSXStyle.utils.book_new();
      let filename = "stock_ods" + new Date().getMilliseconds();
      XLSXStyle.utils.book_append_sheet(workbook, worksheet, filename);
      XLSXStyle.writeFile(workbook, filename + ".xlsx"); //where is this going (downloads)
    }
    catch (err: any) {
      console.log("error caught in XlsxStyleComponent exportToOds: ", err?.message)
    }
  }
  onFileChange(eve: any) {

    try {
      const target: DataTransfer = <DataTransfer>(eve.target);
      if (target.files.length !== 1) { throw new Error("cannot use multiple files") }
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        //const workBook: XLSXStyle.WorkBook = XLSXStyle.read(fileContent, { type: 'binary' });
        const workBook: XLSXStyle.WorkBook = XLSXStyle.read(fileContent, { type: 'binary', cellStyles: true });

        const workSheetName: string = workBook.SheetNames[0];
        const workSheet: XLSXStyle.WorkSheet = workBook.Sheets[workSheetName];
        // console.log("read worksheet with styles", workSheet);
        this.data = (XLSXStyle.utils.sheet_to_json(workSheet, { header: 1 }));
        //this.headData = this.data[0];

        this.data.splice(0, 1);
        this.createSecurity();

      };
      reader.readAsArrayBuffer(target.files[0]);
      //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer

    }
    catch (err: any) {
      console.log("error caught in XlsxStyleComponent fileUpload: ", err?.message)
    }
  }
  callYahoo() {
    // console.log("in callYahoo")
    try {
      //console.log("initialize aristocrats " + this.stocksmap.size)
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
            console.log("error 'getMutualFundPrices':", err?.error?.message)
            this.waiting = "ERROR OCCURRED fetching 'getMutualFundPrices':" + err?.error?.message;

          },
          complete: () => { console.log("complete called in xlsx-style") }
        })
      this.stocksArray = Array.from(this.stocksmap.values());
      //this.tableDataSource.data = this.stocksArray
      setTimeout(() => {
        if (!this.waiting.includes("ERROR")) {
          this.waiting = "done";
        }

      }, 1400);
    }
    catch (err: any) {
      console.log("error caught in xlsx-style callYahoo", err?.message);
    }

  }
  createSecurity() {
    //console.log(" in createSecurity");
    let security: Security;
    try {
      this.data.forEach((val: any[]) => {
        let fifty2wkrng: string = val[9];
        // console.log("test range:", typeof val[9] === "string");
        security = new Security(val[0], val[1], val[2], val[3], val[4], val[5], val[9], val[6], val[7], 4.4, 2.2, 4.3, 4.11, val[8]);

        this.stocksmap.set(security.ticker, security);
        // [ "AGG", 17, 98, 102.93, "Fixed Income", "95.74 - 102.04", 96, 102, 64.65, "safe dividend" ]
      });
      this.stocksArray = Array.from(this.stocksmap.values());
      this.waiting = "ready to fetch";
    }
    catch (err: any) {
      console.log("error caught in xlsx-style createSecurity(): ", err?.message);
    }

  }
  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
