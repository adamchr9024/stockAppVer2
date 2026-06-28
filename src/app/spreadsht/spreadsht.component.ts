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
//import { concatMap } from 'rxjs';
import { MatSort } from '@angular/material/sort'
import { Subscription, concatMap, from } from 'rxjs'
import { PercentDirective } from '../percent.directive';
import { RapidApiGets, SignalServiceGets } from '../../utility/rapidApiGets';
@Component({
  selector: 'app-spreadsht',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, CommonModule, MatInputModule, CdkTableModule, MatSortModule, PercentDirective],
  providers: [RapidapiService],
  templateUrl: './spreadsht.component.html',
  styleUrl: './spreadsht.component.css'
})
export class SpreadshtComponent implements OnInit, AfterViewInit {
  //https://marmo.dev/angular-material-sort-objects#the-complex-scenario-a-structured-object-with-nested-properties
  subscription!: Subscription
  stocksmap: Map<string, Security> = new Map();
  stocksArray: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9")]
  tableDataSource: MatTableDataSource<Security>;
  //columnsToDisplay: string[] = ["ticker", "quantity", "marketvalue", "unitcost", "costbasis", "gainloss", "yahooprice", "actual_dividend", "gnls wth dvd", "est_annual_income", "Comment"];
  //Table columns will be displayed in the same order of values in the array
  colToDisplay: string[] = ['ticker', 'quantity', "marketvalue", "unitcost", "costbasis", 'gainloss', 'yahooprice', 'percentage', 'actual_dividend', 'glwdiv', 'glwdvdpct', 'est_annual_income', 'comment'];
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private utilRapidGets: RapidApiGets, private utilSignalGet: SignalServiceGets) {
    this.tableDataSource = new MatTableDataSource(this.stocksArray);

    utilSignalGet.getSecurityByFileName('Stocks.json', this.stocksmap)
      .pipe(
        concatMap(value => {
          console.log("value", value);
          return utilRapidGets.getKeys(this.stocksmap, 1.2, "2-3", 4);
        })
      ).subscribe(doesNothing => {

        console.log("doesNothing", doesNothing, "stockmap", this.stocksmap.size);
        this.stocksArray = Array.from(this.stocksmap.values());
        this.tableDataSource.data = this.stocksArray;
      })

    //         utilRapidGets.getKeys(this.stocksmap,1.2,"2-3",4));
    //.then((holdwaiting) => {
    // console.log(holdwaiting, "get securities done") //bad logic this is not complete before initialize is called
    //call get rapidService for Securities price
    //this.initialize();

    // })

    // this.subscription =this.signalsService.readSecurities('Stocks.json')
    //   .subscribe(next => {
    //     next.forEach(val => {
    //       this.stocksmap.set(val.ticker, val)
    //     })
    //     this.initialize();
    //   })
  }
  // ngOnDestroy(): void {
  //   if (this.subscription)
  //     this.subscription.unsubscribe();
  // }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    this.tableDataSource.sort = this.sort;
  }
  ngOnInit(): void {
    //ADD CODE
    this.tableDataSource.sortingDataAccessor = (item: any, property) => {

      switch (property) {
        default: return item[property];
      }
    }
  }

  waiting: string = "fetching ..."
  //signalsService = inject(SignalswatchlistService); COULD USE FETCH API
  initialize() {
    try {
      this.waiting = "...fetching"; // getKeys(stocksmap: Map<string, Security>, dividendYield:number, fiftyTwoWeekRange:string, regularMarketPrice:number ){
      this.utilRapidGets.getKeys(this.stocksmap, 2.2, "1-3", 4.25).subscribe(val => val); //CHECK FOR MEMORY LEAKS
      // .then((holdwaiting) => {
      //   this.waiting = holdwaiting;
      this.stocksArray = Array.from(this.stocksmap.values());
      this.tableDataSource.data = this.stocksArray;
      //}).catch(err => {
      //this.waiting = err;
      //})
    }
    catch (err: any) {
      console.error("error caught in spreadsheet initialize", err?.message)
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
  getEstAnnualIncome() {
    return Security.getEstimateAnnualIncome(this.stocksArray).toFixed(2)
  }
  getTotalGLwDvd() {
    return Security.getGLwDTotal(this.stocksArray).toFixed(2);
  }
}
