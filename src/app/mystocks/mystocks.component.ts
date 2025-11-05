import { Component, inject, OnInit } from '@angular/core';
import { Category, Security } from '../../model/security';
import { SignalswatchlistService } from '../signalswatchlist.service';
import { RapidapiService } from '../rapidapi.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mystocks',
  standalone: true,
  imports: [CommonModule],
  providers: [RapidapiService],
  templateUrl: './mystocks.component.html',
  styleUrl: './mystocks.component.css'
})
export class MystocksComponent implements OnInit {
  // stocks: Security[] = [];
  stocksmap: Map<string, Security> = new Map();
  stocksArray: Array<Security> = []

  constructor(private rapidApiService: RapidapiService) {

    this.signalsService.readSecurities('realwatchlist.json')
      .subscribe(next => {
        next.forEach(val => {
          this.stocksmap.set(val.ticker, val)
        })
        this.initialize();
      })
  }
  waiting: string = "fetching ..."
  signalsService = inject(SignalswatchlistService);

  ngOnInit(): void {

  }
  initialize() {
    try {
      // console.log("initialize mystocks " + this.stocksmap.size)
      let moresymbols = Array.from(this.stocksmap.keys());
      this.rapidApiService.getMutualFundPrices(moresymbols)
        .subscribe({//unsubscribe please...how to test  
          next: (n) => {
            // console.log("in subscribe next ")
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
          complete: () => { console.log("complete called in mystocks") }
        })
      this.stocksArray = Array.from(this.stocksmap.values());
      // this.waiting = "done";
      {
        setTimeout(() => {
          if (!this.waiting.includes("ERROR")) {
            console.log("in settimeout if ...testing purposes")
            this.waiting = "done";
          }
        }, 1400);
      }
    }

    catch (err: any) {
      console.log(err?.message)
    }

  }
}
