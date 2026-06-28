import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
//import { SignalswatchlistService } from '../signalswatchlist.service';
//import { RapidapiService } from '../rapidapi.service';
import { Category, Security } from '../../model/security';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
// import { MatPaginator } from '@angular/material/paginator'
import { PercentDirective } from '../percent.directive';
import { MatSort } from '@angular/material/sort'
import { Subscription, concatMap } from 'rxjs';
import { RapidApiGets, SignalServiceGets } from '../../utility/rapidApiGets';

@Component({
  selector: 'app-table-mat',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, CommonModule, MatInputModule, CdkTableModule, MatSortModule, PercentDirective],
  //providers: [RapidapiService],
  templateUrl: './table-mat.component.html',
  styleUrl: './table-mat.component.css'
})
export class TableMatComponent implements OnInit, AfterViewInit, OnDestroy {
  constructorSubscription!: Subscription;
  apiSubscription!: Subscription;
  stocksmap: Map<string, Security> = new Map();
  stocksArray: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9")]
  tableDataSource: MatTableDataSource<Security>;
  //Table columns will be displayed in the same order of values in the array
  colToDisplay: string[] = ['ticker', 'totalcost', 'quantity', "marketvalue", "unitcost", "costbasis", 'gainloss', 'yahooprice', 'fiftytwowkrng', 'percentage', 'effectivePercentage', 'dividendYield', 'glwdiv', 'selltotalval'];
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
      this.constructorSubscription.unsubscribe();
    }
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    this.tableDataSource.sort = this.sort;
  }
  ngOnInit(): void {
    //ADD CODE
    this.tableDataSource.sortingDataAccessor = (item: any, property) => { //logic error here???
      switch (property) {
        case 'quantity': return item.watchQuantity;
        case 'yahoo price': return item.yahooprice;
        case "52 Week Range": return item.fiftytwowkrng;
        case "Price Percentile": return item.percentage;
        case "Dividend Yield": return item.dividendYield;
        case "market value": return item.marketvalue;
        case "cost basis": return item.costbasis;
        case "gain/loss": return item.gainloss;
        case "unit cost": return item.unitcost;
        case "selltotalval": return item.selltotalval;
        case "totalcost": return item.totalcost;
        //case "comment": return item.comment;
        default: return item[property];
      }
    }
  }

  waiting: string = "fetching ..."

  initialize() {
    try {
      this.waiting = "...fetching";
      // console.log("initialize mystocks " + this.stocksmap.size)
      let moresymbols = Array.from(this.stocksmap.keys());
      this.apiSubscription = this.utilRapidGets.getKeys(this.stocksmap)
        .subscribe(() => {
          this.waiting = "done";
          this.stocksArray = Array.from(this.stocksmap.values());
          this.tableDataSource.data = this.stocksArray;
        });
    }
    catch (err: any) {
      console.error("error caught in TableMatComponent  initialize", err?.message)
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
}