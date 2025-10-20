import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { SignalswatchlistService } from '../signalswatchlist.service';
import { RapidapiService } from '../rapidapi.service';
import { Category, Security } from '../../model/security';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
// import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { Subscription } from 'rxjs'
import { PercentDirective } from '../percent.directive';
@Component({
  selector: 'app-spreadsht',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, CommonModule, MatInputModule, CdkTableModule, MatSortModule, PercentDirective],
  providers: [RapidapiService],
  templateUrl: './spreadsht.component.html',
  styleUrl: './spreadsht.component.css'
})
export class SpreadshtComponent implements OnInit, AfterViewInit, OnDestroy {
  //https://marmo.dev/angular-material-sort-objects#the-complex-scenario-a-structured-object-with-nested-properties
  subscription!: Subscription
  stocksmap: Map<string, Security> = new Map();
  // allbutWatchlist: string = Category.Alternative +
  //   Category.Bond + Category.MutualFund +
  //   Category.ETF + Category.FixedIncome + Category.Other + Category.CEF
  //   + Category.Stock + Category.CashAndShortTerm; //ignore money markets
  stocksArray: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9")]
  tableDataSource: MatTableDataSource<Security>;
  //columnsToDisplay: string[] = ["ticker", "quantity", "marketvalue", "unitcost", "costbasis", "gainloss", "yahooprice", "actual_dividend", "gnls wth dvd", "est_annual_income", "Comment"];
  //Table columns will be displayed in the same order of values in the array
  colToDisplay: string[] = ['ticker', 'quantity', "marketvalue", "unitcost", "costbasis", 'gainloss', 'yahooprice', 'percentage', 'actual_dividend', 'glwdiv', 'glwdvdpct', 'est_annual_income', 'comment'];
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private rapidApiService: RapidapiService) {
    this.tableDataSource = new MatTableDataSource(this.stocksArray);

    this.signalsService.readSecurities('Stocks.json')
      .subscribe(next => {
        next.forEach(val => {
          this.stocksmap.set(val.ticker, val)
        })
        this.initialize();
      })
  }
  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    this.tableDataSource.sort = this.sort;
  }
  ngOnInit(): void {
    //ADD CODE
    this.tableDataSource.sortingDataAccessor = (item: any, property) => {
      //console.log("property:", property);
      // console.log("item.property", item[property])
      switch (property) {
        default: return item[property];
      }
    }
  }

  waiting: string = "fetching ..."
  signalsService = inject(SignalswatchlistService);
  initialize() {
    try {
      // console.log("initialize mystocks " + this.stocksmap.size)
      let moresymbols = Array.from(this.stocksmap.keys());
      this.subscription = this.rapidApiService.getMutualFundPrices(moresymbols)
        .subscribe({//unsubscribe please...how to test  
          next: (n) => {
            n.forEach((val2: any) => {
              let updt = this.stocksmap.get(val2.symbol);
              if (updt) {
                updt.dividendYield = val2?.dividendYield;
                updt.fiftytwowkrng = val2?.fiftyTwoWeekRange;
                updt.yahooprice = val2?.regularMarketPrice;
                this.stocksmap.set(updt.ticker, updt)
              }
            })
          },
          error: (err) => {
            console.log("error 'getMutualFundPrices':", err?.error?.message)
            this.waiting = "ERROR OCCURRED fetching 'getMutualFundPrices':" + err?.error?.message;

          },
          complete: () => { console.log("complete called in  table mat") }
        })
      this.stocksArray = Array.from(this.stocksmap.values());
      this.tableDataSource.data = this.stocksArray


      setTimeout(() => {
        if (!this.waiting.includes("ERROR")) {
          this.waiting = "done";
        }
        // console.log("stocks array", this.stocksArray)
      }, 1400);
    }
    catch (err: any) {
      console.log("error caught in table-mat initialize", err?.message)
    }
  }
  filterData(event: any) {
    const filterValue = event.target.value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase()
    //  console.log("in filter", filterValue)
  }
  getTotalLosses() {
    return Security.getTotalGainLoss(this.stocksArray).toFixed(2);
  }
  getTotalMarketValues() {
    return Security.getTotalMarketValue(this.stocksArray).toFixed(2);
  }
  getTotalLossesWithDividends() {
    return Security.getGainLossWithDividend(this.stocksArray).toFixed(2)
  }
}
