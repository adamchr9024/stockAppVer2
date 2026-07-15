import { AfterViewInit, Component, ElementRef, inject, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, Renderer2 } from '@angular/core';
import { RapidapiService } from '../rapidapi.service';
import { Category, Security } from '../../model/security';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
// import { MatPaginator } from '@angular/material/paginator'
import { RapidApiGets, SignalServiceGets } from '../../utility/rapidApiGets';
import { AristocratTableComponent } from '../aristocrat-table/aristocrat-table.component';
import { PercentDirective } from '../percent.directive';
import { MatSort } from '@angular/material/sort'
import { Subscription, concatMap } from 'rxjs';
@Component({
  selector: 'app-aristocrat-stock',
  standalone: true,
  imports: [MatFormFieldModule, AristocratTableComponent, MatTableModule, CommonModule, MatInputModule, CdkTableModule, MatSortModule, PercentDirective],
  //providers: [RapidapiService],
  templateUrl: './aristocrat-stock.component.html',
  styleUrl: './aristocrat-stock.component.css'
})
export class AristocratStockComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  constructorSubscription!: Subscription;
  apiSubscription!: Subscription;
  stocksmap: Map<string, Security> = new Map();
  stocksArray: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9")]
  tableDataSource: MatTableDataSource<Security>;
  matOrig = true;
  //Table columns will be displayed in the same order of values in the array
  colToDisplay: string[] = ['ticker', 'comment', 'getYahooPrice', 'fiftytwowkrng', 'percentage', 'category', 'quantity', 'dividendYield', 'potentialYearlyDividend',];
  securityFiles: string[] = ["Stocks.json", "morehyetfs.json", "recenthyetfs.json", "new_watchlist.json", "growth_global.json", "dividendarist.json",
    "dividendetf.json", "allenergy.json", "chatgpt.json", "smtchatg.json", "realwatchlist.json", "allgits.json", "empower.json"]
  thefileOutput: string = "Stocks.json";

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("filterInput") filterinput!: ElementRef;//this was a guess
  constructor(private utilRapidGets: RapidApiGets, private utilSignalGet: SignalServiceGets, private renderer: Renderer2) {
    this.tableDataSource = new MatTableDataSource(this.stocksArray);
    this.preinitial(this.securityFiles[0]); //make Stocks.json my default file
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("onchanges called")
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
    console.log("sort", this.sort);
    this.tableDataSource.sort = this.sort;
  }
  ngOnInit(): void {

    this.tableDataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'quantity': return item.watchQuantity;
        default: return item[property];
      }
    }
  }
  waiting: string = "ready to fetch"
  //signalsService = inject(SignalswatchlistService);
  preinitial(securityFile: string) {
    //clear stocksmap
    this.stocksmap.clear();
    this.waiting = "...fetching";
    this.constructorSubscription = this.utilSignalGet.getSecurityByFileName(securityFile, this.stocksmap)
      .pipe(
        concatMap(() => { //wait for stocksmap to be filled before calling rapidApi
          return this.utilRapidGets.getKeys(this.stocksmap);
        })
      ).subscribe(() => { //the values a updated by passing by reference and nothing is returned from observable
        this.waiting = "done"
        console.log("stockmap", this.stocksmap.size, securityFile);
        this.stocksArray = Array.from(this.stocksmap.values());
        this.tableDataSource.data = this.stocksArray;
      })
  }
  initialize() { //used to refresh securities
    try {
      this.waiting = "...fetching";
      console.log("initialize aristocrat " + this.stocksmap.size)
      // let moresymbols = Array.from(this.stocksmap.keys());
      this.apiSubscription = this.utilRapidGets.getKeys(this.stocksmap)
        .subscribe(() => {
          this.waiting = "done";
          this.stocksArray = Array.from(this.stocksmap.values());
          this.tableDataSource.data = this.stocksArray;
        });
    }
    catch (err: any) {
      console.error("error caught in Aristocrat Stock  initialize", err?.message)
    }

  }
  handleRadio(matOrOrig: boolean) {
    this.matOrig = matOrOrig;
  }
  filterData(event: any) {
    const filterValue = event.target.value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase()
  }
  handleInputFileChange(theFile: string) {
    //clear filter text box    should I use look in notes Renderer2
    this.renderer.setProperty(this.filterinput.nativeElement, 'value', "");
    //this.filterinput.nativeElement.value = "";
    this.tableDataSource.filter = "";
    this.thefileOutput = theFile;
    this.preinitial(theFile);
  }
}
