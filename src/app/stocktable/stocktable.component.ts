import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterLink } from '@angular/router';
import { Security, Category, symbolprice } from '../../model/security';
import { RapidapiService } from '../rapidapi.service';
import { HeaderComponent } from '../header/header.component';
//import { Observable, of } from 'rxjs';
import { MytableComponent } from '../mytable/mytable.component';
import { FinnhubService } from '../finnhub.service';
import { DefaultApi } from 'finnhub-ts'
import { SignalswatchlistService } from '../signalswatchlist.service';
@Component({
  selector: 'app-stocktable',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MytableComponent],
  providers: [RapidapiService, DefaultApi, FinnhubService, SignalswatchlistService],
  templateUrl: './stocktable.component.html',
  styleUrl: './stocktable.component.css'
})
export class StocktableComponent implements OnInit {
  stocks: Security[] = [];
  stocksmap: Map<string, Security> = new Map();
  allbutWatchlist: string = Category.Alternative +
    Category.Bond + Category.MutualFund +
    Category.ETF + Category.FixedIncome + Category.Other
    + Category.Stock + Category.CashAndShortTerm

  waiting: string = "fetching ..."

  finnhubService = inject(FinnhubService);
  signalsService = inject(SignalswatchlistService)
  constructor(private rapidApiService: RapidapiService) {
    this.signalsService.readSecurities(this.allbutWatchlist)
      .subscribe(next => {
        this.stocks = next;
        next.forEach(val => {
          this.stocksmap.set(val.ticker, val)
        })
        this.initialize();
      })
  }

  ngOnInit(): void {

  }
  initialize() {
    let thesymbols = this.stocks.filter(stoc => stoc?.category != Category.MutualFund && stoc?.category != Category.CashAndShortTerm).map(x => x.ticker);
    this.finnhubService.getAllPrices(thesymbols)
      .then(symprices => {
        symprices.forEach(val2 => {
          let updt = this.stocksmap.get(val2.symbol);
          if (updt) {
            updt.yahooprice = val2.price;
            this.stocksmap.set(updt.ticker, updt);
          }
        })
        //this is added here because finnhub has sleep time add

        this.stocks = Array.from(this.stocksmap.values());
        this.waiting = "done";
      })
    //let k = 24
    let moresymbols = this.stocks.filter(stoc => stoc?.category == Category.MutualFund).map(t => t.ticker);
    this.rapidApiService.getMutualFundPrices(moresymbols)
      .subscribe((body: any[]) => {//unsubscribe please...how to test
        body.forEach(val2 => {
          let updt = this.stocksmap.get(val2.symbol);
          if (updt) {
            updt.dividendYield = val2?.dividendYield;
            updt.fiftytwowkrng = val2?.fiftyTwoWeekRange;
            updt.yahooprice = val2?.regularMarketPrice;
            this.stocksmap.set(updt.ticker, updt);
          }
        })
      })
  }
}
