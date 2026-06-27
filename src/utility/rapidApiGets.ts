import { Security } from "../model/security";
import { RapidapiService } from "../app/rapidapi.service";
//import { of } from "rxjs";
import { Subscription } from 'rxjs'
import { Injectable, OnInit, OnDestroy } from '@angular/core';

/**
 * get stockmap and the fields to update
 * maybe return a promise when it done or return observable
 * 
                updt.dividendYield = val2?.dividendYield;
                updt.fiftytwowkrng = val2?.fiftyTwoWeekRange;
                updt.yahooprice = val2?.regularMarketPrice;
 */
@Injectable({
  providedIn: 'root'
})
export class RapidApiGets implements OnDestroy {
  constructor(private rapidApiService: RapidapiService) {}
    
    waiting="";
    subscription!: Subscription;
   getKeys(stocksmap: Map<string, Security>, dividendYield:number, fiftyTwoWeekRange:string, regularMarketPrice:number ){
      try {
      //this.waiting = "...fetching";
      let moresymbols = Array.from(stocksmap.keys());
      this.subscription = this.rapidApiService.getMutualFundPrices(moresymbols)
        .subscribe({//unsubscribe please...how to test  
          next: (n) => {
            n.forEach((val2: any) => {
              let updt = stocksmap.get(val2.symbol);
              if (updt) {
                updt.dividendYield = val2?.dividendYield;
                updt.fiftytwowkrng = val2?.fiftyTwoWeekRange;
                updt.yahooprice = val2?.regularMarketPrice;
                
              }
            })
          },
          error: (err) => {
            console.error("error 'getKeys':", err?.error?.message)
            this.waiting = "ERROR OCCURRED fetching 'getMutualFundPrices':" + err?.error?.message;
            return Promise.reject(this.waiting);
          },
          complete: () => {
            this.waiting = 'done';
            console.log("complete called in getKeys");
            return Promise.resolve(this.waiting);
          }
        })
      
    }
    catch (err: any) {
      console.error("error caught in RapidApiGets.getKeys()", err?.message);
      this.waiting = "ERROR OCCURRED fetching 'getMutualFundPrices':" + err?.error?.message;
      return Promise.reject(this.waiting);
    }
    this.waiting = 'done'; //should never get here
            return Promise.resolve(this.waiting);
   }
    ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
 




}