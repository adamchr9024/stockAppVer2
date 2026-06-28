import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild, } from '@angular/core';
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
import { Subscription, concatMap, } from 'rxjs'
import { PercentDirective } from '../percent.directive';
import { RapidApiGets, SignalServiceGets } from '../../utility/rapidApiGets';
@Component({
  selector: 'app-spreadsht',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, CommonModule, MatInputModule, CdkTableModule, MatSortModule, PercentDirective],
  templateUrl: './spreadsht.component.html',
  styleUrl: './spreadsht.component.css'
})
export class SpreadshtComponent implements OnInit, AfterViewInit {
  //https://marmo.dev/angular-material-sort-objects#the-complex-scenario-a-structured-object-with-nested-properties
  constructorSubscription!: Subscription;
  apiSubscription!: Subscription;
  stocksmap: Map<string, Security> = new Map();
  stocksArray: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9")]
  tableDataSource: MatTableDataSource<Security>;
  //Table columns will be displayed in the same order of values in the array
  colToDisplay: string[] = ['ticker', 'quantity', "marketvalue", "unitcost", "costbasis", 'gainloss', 'yahooprice', 'percentage', 'actual_dividend', 'glwdiv', 'glwdvdpct', 'est_annual_income', 'comment'];
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private utilRapidGets: RapidApiGets, private utilSignalGet: SignalServiceGets) {
    this.tableDataSource = new MatTableDataSource(this.stocksArray);
    //https://www.learnrxjs.io/learn-rxjs/operators/transformation/concatmap
    this.constructorSubscription = utilSignalGet.getSecurityByFileName('Stocks.json', this.stocksmap)
      .pipe(
        concatMap(() => { //wait for stocksmap to be filled before calling rapidApi
          return utilRapidGets.getKeys(this.stocksmap);
        })
      ).subscribe(() => { //the values a updated by passing by reference and nothing is returned from observable
        this.waiting = "done"
        console.log("stockmap", this.stocksmap.size);
        this.stocksArray = Array.from(this.stocksmap.values());
        this.tableDataSource.data = this.stocksArray;
      })
  }
  ngOnDestroy(): void {
    if (this.constructorSubscription) {
      console.log("before unsubscribe constructor");
      this.constructorSubscription.unsubscribe();
    }
    if (this.apiSubscription) {
      console.log("before unsubscribe api");
      this.apiSubscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
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
  initialize() {
    try {
      // console.log("fetching");
      this.waiting = "...fetching"; // getKeys(stocksmap: Map<string, Security>, dividendYield:number, fiftyTwoWeekRange:string, regularMarketPrice:number ){
      this.apiSubscription = this.utilRapidGets.getKeys(this.stocksmap)
        .subscribe(() => {
          this.waiting = "done";
          this.stocksArray = Array.from(this.stocksmap.values());
          this.tableDataSource.data = this.stocksArray;
        });
    }
    catch (err: any) {
      console.error("error caught in spreadsheet initialize", err?.message)
    }
  }
  filterData(event: any) {
    const filterValue = event.target.value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
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
