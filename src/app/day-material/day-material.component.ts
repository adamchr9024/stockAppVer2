import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
//import { AfterViewInit, Component, ElementRef, inject, OnChanges, OnDestroy, OnInit,
// , ViewChild, Renderer2 } from '@angular/core';

import { Category, Security, DayChangeType } from '../../model/security';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { RapidApiGets, SignalServiceGets } from '../../utility/rapidApiGets';
//import { AristocratTableComponent } from '../aristocrat-table/aristocrat-table.component';
//import { PercentDirective } from '../percent.directive';
import { MatSort } from '@angular/material/sort'
import { Subscription, concatMap } from 'rxjs';
import { FiveDayMedianAverageComponent } from '../five-day-median-average/five-day-median-average.component';
@Component({
  selector: 'app-day-material',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, CommonModule, MatInputModule, CdkTableModule, MatSortModule, FiveDayMedianAverageComponent],
  templateUrl: './day-material.component.html',
  styleUrl: './day-material.component.css'
})
export class DayMaterialComponent implements OnInit, AfterViewInit, OnDestroy {
  constructorSubscription!: Subscription;
  apiSubscription!: Subscription;
  stocksmap: Map<string, Security> = new Map();
  stocksArray: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9")];
  dayChangeData: Array<DayChangeType> = [{
    symbol: 'aapl', regularMarketPrice: 22, regularMarketChange: .5, regularMarketChangePercent: 0.1,
    regularMarketVolume: 1000, averageDailyVolume3Month: 1000, regularMarketPreviousClose: 23, regularMarketOpen: 23.5,
    regularMarketDayRange: '5-6.2', fiftyTwoWeekRange: '4-6.7', fiftyTwoWeekRangeMin: 3.6, fiftyTwoWeekRangeMax: 7.1,
    regularMarketDayRangeMin: 4, regularMarketDayRangeMax: 4.7, percentage: 52.4
  }]
  tableDataSource: MatTableDataSource<DayChangeType>;

  colToDisplay: string[] = [
    'symbol',
    'regularMarketPrice',
    'regularMarketChange',
    'regularMarketChangePercent',
    'regularMarketVolume',
    'averageDailyVolume3Month',
    'regularMarketPreviousClose',
    'regularMarketOpen',
    'regularMarketDayRange',
    'fiftyTwoWeekRange',
    'percentage'
  ];
  securityFiles: string[] = ["Stocks.json", "morehyetfs.json", "recenthyetfs.json", "new_watchlist.json", "growth_global.json", "dividendarist.json",
    "dividendetf.json", "allenergy.json", "chatgpt.json", "smtchatg.json", "realwatchlist.json", "allgits.json", "empower.json"]
  thefileOutput: string = "Stocks.json";

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("filterInput") filterinput!: ElementRef;//this was a guess
  constructor(private utilRapidGets: RapidApiGets, private utilSignalGet: SignalServiceGets, private renderer: Renderer2) {
    this.tableDataSource = new MatTableDataSource(this.dayChangeData);
    this.preinitial(this.securityFiles[0]); //make Stocks.json my default file
  }
  waiting: string = "ready to fetch"
  //signalsService = inject(SignalswatchlistService);
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
    //this.renderer.setProperty
  }
  ngOnInit(): void {
    //ADD CODE
    this.tableDataSource.sortingDataAccessor = (item: any, property) => { //logic error here???
      // console.log(item[property]);
      return item[property];
    }
  }
  preinitial(securityFile: string) {
    //should I clear stocksArray as well?
    this.dayChangeData.length = 0;
    this.stocksArray.length = 0;
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
        //call to dayChange data    filterout money market funds
        this.getDayChangeData();
        this.tableDataSource.data = this.dayChangeData;
      })
    //})
  }
  getDayChangeData() {
    this.dayChangeData = this.utilRapidGets.getDayChangeData().filter(item => !(item.symbol.endsWith("XX")));
    //console.log("dayChangeData[0]", this.dayChangeData[0]);
    this.addRanges();
    this.dayChangeData.forEach(data => {
      data.percentage = this.stocksmap.get(data.symbol)!.percentage;
      data.comment = this.stocksmap.get(data.symbol)?.comment;
    })
  }

  addRanges() {
    this.dayChangeData.forEach(val => {
      let fifty_twowkrng = val.fiftyTwoWeekRange
      let min, max;
      let small_large = fifty_twowkrng?.split("-");
      if (small_large) {
        min = +small_large[0];
        max = +small_large[1];
        val.fiftyTwoWeekRangeMin = min || 1;
        val.fiftyTwoWeekRangeMax = max || 10;
      }
      fifty_twowkrng = val.regularMarketDayRange;
      small_large = fifty_twowkrng?.split("-");
      if (small_large) {

        min = +small_large[0];
        max = +small_large[1];
        val.regularMarketDayRangeMin = min || 1;
        val.regularMarketDayRangeMax = max || 10
      }
      else {
        val.regularMarketDayRangeMin = val.regularMarketPrice
        val.regularMarketDayRangeMax = val.regularMarketPrice
      }

    })

  }
  initialize() { //used to refresh securities
    try {
      this.waiting = "...fetching";
      console.log("initialize day-material " + this.stocksmap.size)
      // let moresymbols = Array.from(this.stocksmap.keys());
      this.apiSubscription = this.utilRapidGets.getKeys(this.stocksmap)
        .subscribe(() => {
          this.waiting = "done";
          this.stocksArray = Array.from(this.stocksmap.values());
          this.getDayChangeData();
          this.tableDataSource.data = this.dayChangeData;  //is this needed again
        });
    }
    catch (err: any) {
      console.error("error caught in Day Material  initialize", err?.message)
    }

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
