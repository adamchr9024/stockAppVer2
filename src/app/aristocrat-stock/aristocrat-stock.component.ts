import { AfterViewInit, Component, inject, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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

import { AristocratTableComponent } from '../aristocrat-table/aristocrat-table.component';
import { MatSort } from '@angular/material/sort'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-aristocrat-stock',
  standalone: true,
  imports: [MatFormFieldModule, AristocratTableComponent, MatTableModule, CommonModule, MatInputModule, CdkTableModule, MatSortModule],
  providers: [RapidapiService],
  templateUrl: './aristocrat-stock.component.html',
  styleUrl: './aristocrat-stock.component.css'
})
export class AristocratStockComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  subscription!: Subscription
  stocksmap: Map<string, Security> = new Map();
  stocksArray: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9")]
  tableDataSource: MatTableDataSource<Security>;
  matOrig = true;
  columnsToDisplay: string[] = ["ticker", "comment", "yahoo price", "52 Week Range", "Price Precentile", "category", "quantity", "Dividend Yield", "Potential Yearly Dividend ($500)",]
  //Table columns will be displayed in the same order of values in the array
  colToDisplay: string[] = ['ticker', 'comment', 'yahooprice', 'fiftytwowkrng', 'percentage', 'category', 'quantity', 'dividendYield', 'potentialYearlyDividend',];

  /*
    columnsToDisplay: string[] = ["ticker", "comment", "yahoo price", "52 Week Range", "Price Precentile"]
    //Table columns will be displayed in the same order of values in the array
    colToDisplay: string[] = ['ticker', 'comment', 'yahooprice', 'fiftytwowkrng', 'percentage'];
    */
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private rapidApiService: RapidapiService) {
    this.tableDataSource = new MatTableDataSource(this.stocksArray);

    //this.signalsService.getAphas('morehyetfs.json')
    this.signalsService.getAphas('recenthyetfs.json')  // NUBIA INDEX FUNDS
      //this.signalsService.getAphas('new_watchlist.json')  //NUBIA INDEX ETF INCLUDED
      //this.signalsService.getAphas('Stocks.json')
      //this.signalsService.getAphas('alpha2hy.json')
      //this.signalsService.getAphas('dividendarist.json')//'dividendarist.json'
      //this.signalsService.getAphas('dividendetf.json')//'dividendetf.json'
      .subscribe(next => {
        next.forEach(val => {
          this.stocksmap.set(val.ticker, val)
        })
        this.initialize();
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("onchanges called")
  }
  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();

  }
  ngAfterViewInit(): void {
    this.tableDataSource.sort = this.sort;
  }
  ngOnInit(): void {

    this.tableDataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'quantity': return item.watchQuantity;
        case 'yahoo price': return item.yahooprice;
        case "52 Week Range": return item.fiftytwowkrng;
        case "Price Precentile": return item.percentage;
        case "Dividend Yield": return item.dividendYield;
        case "Potential Yearly Dividend ($500)": return item.potentialYearlyDividend;
        default: return item[property];
      }
    }
  }
  waiting: string = "ready to fetch"
  signalsService = inject(SignalswatchlistService);
  initialize() {
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
            console.log("error 'getMutualFundPrices':", err?.error?.message)
            this.waiting = "ERROR OCCURRED fetching 'getMutualFundPrices':" + err?.error?.message;

          },
          complete: () => { console.log("complete called in aristocrats") }
        })
      this.stocksArray = Array.from(this.stocksmap.values());
      this.tableDataSource.data = this.stocksArray


      setTimeout(() => {
        if (!this.waiting.includes("ERROR")) {
          this.waiting = "done";
        }

      }, 1400);
    }
    catch (err: any) {
      console.log("error caught in material-table initialize", err?.message);
    }

  }
  handleRadio(matOrOrig: boolean) {
    // console.log("in handleRadio", matOrOrig);
    this.matOrig = matOrOrig;
  }
  filterData(event: any) {
    const filterValue = event.target.value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase()

  }
  // handleFile(theFile: string) {
  //   console.log("in handleFile ", theFile);
  //   this.loadData(theFile);
  // }
}
