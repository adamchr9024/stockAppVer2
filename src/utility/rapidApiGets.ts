import { Security } from "../model/security";
import { RapidapiService } from "../app/rapidapi.service";
import { take, switchMap, catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { SignalswatchlistService } from '../app/signalswatchlist.service';
//import { __await } from "tslib";
/**
 * get stockmap and the fields to update
                 updt.dividendYield = val2?.dividendYield;
                updt.fiftytwowkrng = val2?.fiftyTwoWeekRange;
                updt.yahooprice = val2?.regularMarketPrice;
 */
@Injectable({
    providedIn: 'root'
})
export class RapidApiGets {
    constructor(private rapidApiService: RapidapiService) { }

    getKeys(stocksmap: Map<string, Security>) {
        try {
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
                                updt.setYahooPrice = val2?.regularMarketPrice;
                                updt.fiftyDayAverage = val2?.fiftyDayAverage;
                                updt.fiftyDayAverageChange = val2?.fiftyDayAverageChange;
                                updt.twoHundredDayAverage = val2?.twoHundredDayAverage; //twoHundredDayAverage
                                updt.twoHundredDayAverageChange = val2?.twoHundredDayAverageChange;
                                updt.trailingAnnualDividendRate = val2?.trailingAnnualDividendRate;

                            }
                        })
                    }),
                    catchError(err => {
                        console.error("error caught and rethrown in RapidApiGets.getKeys() getMutualFund call", err);
                        throw err;
                    })
                )
        }
        catch (err: any) {
            console.error("error caught in RapidApiGets.getKeys()", err?.message);
            throw err;
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class SignalServiceGets {
    constructor(private signalsService: SignalswatchlistService) { }
    //passing stocksmap by reference to update securities
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
}





