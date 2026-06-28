import { Security } from "../model/security";
import { RapidapiService } from "../app/rapidapi.service";
//import { of } from "rxjs";
import { take, switchMap, catchError, map } from "rxjs/operators";
import { Observable, Subscription, of } from 'rxjs'
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { SignalswatchlistService } from '../app/signalswatchlist.service';
import { __await } from "tslib";
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
    constructor(private rapidApiService: RapidapiService) { }

    waiting = "";
    subscription!: Subscription;
    getKeys(stocksmap: Map<string, Security>, dividendYield: number, fiftyTwoWeekRange: string, regularMarketPrice: number) {
        try {
            //this.waiting = "...fetching";
            let moresymbols = Array.from(stocksmap.keys());
            return this.rapidApiService.getMutualFundPrices(moresymbols)
                .pipe(
                    take(1),
                    switchMap(async (n: any) => {
                        await n.forEach((val2: any) => {
                            let updt = stocksmap.get(val2.symbol);
                            if (updt) {
                                updt.dividendYield = val2?.dividendYield;
                                updt.fiftytwowkrng = val2?.fiftyTwoWeekRange;
                                updt.yahooprice = val2?.regularMarketPrice;

                            }
                        })
                        // return n;
                    }),
                    map((x: any) => {
                        return x?.body;
                    }),
                    catchError(err => {
                        console.error("error caught and rethrown in RapidApiGets.getKeys()", err);
                        throw err;
                    })
                )

            //.subscribe({//unsubscribe please...how to test  
            //     next: (n) => {
            //         n.forEach((val2: any) => {
            //             let updt = stocksmap.get(val2.symbol);
            //             if (updt) {
            //                 updt.dividendYield = val2?.dividendYield;
            //                 updt.fiftytwowkrng = val2?.fiftyTwoWeekRange;
            //                 updt.yahooprice = val2?.regularMarketPrice;

            //             }
            //         })
            //     },
            //     error: (err) => {
            //         console.error("error 'getKeys':", err?.error?.message)
            //         this.waiting = "ERROR OCCURRED fetching 'getMutualFundPrices':" + err?.error?.message;
            //          return of(this.waiting);  //Promise.reject(this.waiting);
            //     },
            //     complete: () => {// 
            //         this.waiting = 'done';
            //         console.log("complete called in getKeys");
            //          return of(this.waiting);  //Promise.resolve(this.waiting);
            //     }
            // })

        }
        catch (err: any) {
            console.error("error caught in RapidApiGets.getKeys()", err?.message);
            throw err;
            // this.waiting = "ERROR OCCURRED fetching 'getMutualFundPrices':" + err?.error?.message;
            // return Promise.reject(this.waiting);
        }
        // console.log("should never get here getKeys")
        // this.waiting = 'done'; //should never get here
        //return Promise.resolve(this.waiting);
    }
    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}

@Injectable({
    providedIn: 'root'
})
export class SignalServiceGets implements OnDestroy { //todo maybe return a promise as well
    constructor(private signalsService: SignalswatchlistService) { }

    //waiting = "";
    subscription!: Subscription;
    getSecurityByFileName(fileName: string, stocksmap: Map<string, Security>) {
        return this.signalsService.readSecurities(fileName)
            .pipe(
                take(1),
                switchMap(async (n: any) => {
                    await n.forEach((val: any) => {
                        stocksmap.set(val.ticker, val);
                    })
                }),
                catchError(err => {
                    console.error("error caught and rethrown in SignalserviceGets()", err);
                    throw err;
                })
            )
    }

    //console.log("should never get here getSecurityByFileName");
    //this.waiting = 'done'; //should never get here
    //return Promise.resolve(this.waiting);

    ngOnDestroy(): void {  //may not want this due to delay of switching between components
        if (this.subscription)
            //  console.log("in destroy SingalServiceGets", this.subscription)
            this.subscription.unsubscribe();
    }

}





