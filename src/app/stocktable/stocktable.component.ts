import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterLink } from '@angular/router';
import { Security, Category, symbolprice } from '../../model/security';
import { RapidapiService } from '../rapidapi.service';

//import { Observable, of } from 'rxjs';
import { MytableComponent } from '../mytable/mytable.component';
import { FinnhubService } from '../finnhub.service';
import { DefaultApi } from 'finnhub-ts'
import { SignalswatchlistService } from '../signalswatchlist.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-stocktable',
  standalone: true,
  imports: [CommonModule, MytableComponent],
  providers: [RapidapiService, DefaultApi, FinnhubService, SignalswatchlistService],
  templateUrl: './stocktable.component.html',
  styleUrl: './stocktable.component.css'
})
export class StocktableComponent implements OnInit, OnDestroy {
  subscription!: Subscription
  stocks: Security[] = [];
  stocksmap: Map<string, Security> = new Map();
  // allbutWatchlist: string = Category.Alternative +
  //   Category.Bond + Category.MutualFund +
  //   Category.ETF + Category.FixedIncome + Category.Other
  //   + Category.Stock + Category.CashAndShortTerm + Category.CEF

  waiting: string = "fetching ..."

  finnhubService = inject(FinnhubService);
  signalsService = inject(SignalswatchlistService)
  constructor(private rapidApiService: RapidapiService) {
    this.signalsService.readSecurities('Stocks.json')
      .subscribe(next => {
        this.stocks = next;
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

  ngOnInit(): void {

  }
  initialize() {
    let thesymbols = this.stocks.filter(stoc => stoc?.category != Category.MutualFund && stoc?.category != Category.CashAndShortTerm).map(x => x.ticker);
    this.finnhubService.getAllPrices(thesymbols)
      .then(symprices => {
        symprices.forEach(val2 => {
          let updt = this.stocksmap.get(val2.symbol);
          if (updt) {
            updt.yahooprice = val2.price ? val2.price : 0;
            this.stocksmap.set(updt.ticker, updt);
          }
        })
        //this is added here because finnhub has sleep time add

        this.stocks = Array.from(this.stocksmap.values());
        if (!this.waiting.includes("ERROR")) {
          this.waiting = "done";
        }
      })
      .catch(err => {
        console.error('error caught stocktable initialize getAllPrices', err)
        if (this.waiting.includes('ERROR')) {
          this.waiting += " and error fetching securites from finnhub: " + err
        }
        else {
          this.waiting = "Error fetching securities from finnhubb"
        }
      })
    //let k = 24
    let moresymbols = this.stocks.filter(stoc => stoc?.category == Category.MutualFund).map(t => t.ticker);
    this.subscription = this.rapidApiService.getMutualFundPrices(moresymbols)
      .subscribe({
        next: (body: any[]) => {//unsubscribe please...how to test
          body.forEach(val2 => {
            let updt = this.stocksmap.get(val2.symbol);
            if (updt) {
              updt.dividendYield = val2?.dividendYield;
              updt.fiftytwowkrng = val2?.fiftyTwoWeekRange;
              updt.yahooprice = val2?.regularMarketPrice;
              this.stocksmap.set(updt.ticker, updt);
            }
          })
        },
        error: (err) => {
          console.error("error caught in stocktable.ts: ", err?.error?.message)
          this.waiting = "ERROR OCCURRED fetching 'getMutualFundPrices':" + err?.error?.message;
        },
        complete: () => { console.log("complete called in stocktable") }
      })
  }
}
