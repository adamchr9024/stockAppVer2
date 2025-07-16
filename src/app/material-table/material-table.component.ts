import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
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
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-material-table',
  standalone: true,
  imports: [HeaderComponent, MatFormFieldModule, MatTableModule, CommonModule, MatInputModule, CdkTableModule, MatSortModule],
  providers: [RapidapiService],
  templateUrl: './material-table.component.html',
  styleUrl: './material-table.component.css'
})
//https://marmo.dev/angular-material-sort-objects#the-complex-scenario-a-structured-object-with-nested-properties
export class MaterialTableComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription!: Subscription
  stocksmap: Map<string, Security> = new Map();
  stocksArray: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9")]
  tableDataSource: MatTableDataSource<Security>;
  columnsToDisplay: string[] = ["ticker", "category", "quantity", "yahoo price", "52 Week Range", "Price Precentile", "Dividend Yield", "Potential Yearly Dividend ($500)", "comment"]
  //Table columns will be displayed in the same order of values in the array
  colToDisplay: string[] = ['ticker', 'category', 'quantity', 'yahooprice', 'fiftytwowkrng', 'percentage', 'dividendYield', 'potentialYearlyDividend', 'comment'];
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private rapidApiService: RapidapiService) {
    this.tableDataSource = new MatTableDataSource(this.stocksArray);

    this.signalsService.readSecurities(Category.WatchList)
      .subscribe(next => {
        next.forEach(val => {
          this.stocksmap.set(val.ticker, val)
        })
        this.initialize();
      })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
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
        // case "ticker": return item.ticker;
        //case "category": return item.category;
        //case "comment": return item.comment;
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
                // console.log("trailingAnnualDividendRate=", val2.symbol, val2.trailingAnnualDividendRate)
                updt.trailingAnnualDividendRate = val2?.trailingAnnualDividendRate;
                this.stocksmap.set(updt.ticker, updt)
              }
            })
          },
          error: (err) => {
            console.log("error 'getMutualFundPrices':", err?.error?.message)
            this.waiting = "ERROR OCCURRED fetching 'getMutualFundPrices':" + err?.error?.message;

          },
          complete: () => { console.log("complete called in materials table") }
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
      console.log("error caught in material-table initialize", err?.message)
    }

  }
  filterData(event: any) {
    const filterValue = event.target.value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase()
    //  console.log("in filter", filterValue)
  }
}
