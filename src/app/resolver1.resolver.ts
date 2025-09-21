import { ResolveFn } from '@angular/router';
import { inject, OnInit } from '@angular/core';
import { Category, Security } from '../model/security';
import { RapidapiService } from './rapidapi.service';
import { SignalswatchlistService } from './signalswatchlist.service';
import { take, map, catchError, switchMap } from "rxjs/operators";
import { of } from 'rxjs';
//https://www.youtube.com/watch?v=Iw2_-oXehMc
export const resolver1Resolver: ResolveFn<Map<string, Security>> = (route, state) => {
  const rapidApiService = inject(RapidapiService)
  const signalsService = inject(SignalswatchlistService);
  const stocksmap: Map<string, Security> = new Map();
  const allbutWatchlist: string = Category.Alternative +
    Category.Bond + Category.MutualFund +
    Category.ETF + Category.FixedIncome + Category.Other + Category.CEF
    + Category.Stock + Category.CashAndShortTerm;

  signalsService.readSecurities(allbutWatchlist)
    .subscribe(next => {
      next.forEach(val => {
        stocksmap.set(val.ticker, val)
      })
    });
  const moresymbols = Array.from(stocksmap.keys());
  if (moresymbols.length) {
    return rapidApiService.getMutualFundPricesResolve(moresymbols)
  }
  else {
    return rapidApiService.getMutualFundPricesResolve(['aapl'])
  }
}

