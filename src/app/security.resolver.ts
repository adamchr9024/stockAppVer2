import { inject, OnInit } from '@angular/core';
import { Security, Category } from '../model/security';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, } from '@angular/router';
import { SignalswatchlistService } from './signalswatchlist.service';
import { Observable, } from 'rxjs';
import { RapidapiService } from './rapidapi.service';
@Injectable({
  providedIn: 'root',

})
export class SecurityResolver1 implements OnInit, Resolve<Map<string, Security>> {
  //https://www.youtube.com/watch?v=xeS6CLQ_R2k&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=100
  allbutWatchlist: string = Category.Alternative +
    Category.Bond + Category.MutualFund +
    Category.ETF + Category.FixedIncome + Category.Other + Category.CEF
    + Category.Stock + Category.CashAndShortTerm;
  signalsService = inject(SignalswatchlistService);
  // snapShot = inject(ActivatedRouteSnapshot);
  stocksmap: Map<string, Security> = new Map();
  constructor(private rapidApiService: RapidapiService) {
    // console.log(this.snapShot.url.join(""));
    this.signalsService.readSecurities(this.allbutWatchlist)
      .subscribe(next => {//all I need is the tickers
        next.forEach(val => {
          this.stocksmap.set(val.ticker, val)
        })
      })
  }

  ngOnInit(): void {
    try {
      ///const url = this.snapShot.url.join("");
      // console.log("url:", url);
      // switch (url) {
      //  case 'table-mat': this.signalsService.readSecurities(this.allbutWatchlist)
      //   .subscribe(next => {
      //      next.forEach(val => {
      //       this.stocksmap.set(val.ticker, val)
      //       })
      //    });
      //    break;
      // this.signalsService.readSecurities(Category.WatchList)
      // .subscribe(next => {
      //  next.forEach(val => {
      //    this.stocksmap.set(val.ticker, val)
      //  })
      //this.initialize();
      // })
      // break;
      // case 'aristocrats': this.signalsService.
      // break;
      //  case '': this.signalsService.
      //    break;
      //  case '': this.signalsService.
      //    break;
      // default: break;
      //}
    }
    catch (err: any) {
      console.log("error caught in SecurityResolver1 onInit ", err?.message)

    }
    //const url: string = route.snapshot.url.join('');
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Map<string, Security>> | Observable<Map<string, Security>> | Map<string, Security> {

    try {

      // let moresymbols = Array.from(this.stocksmap.keys());
      return this.rapidApiService.getMutualFundPricesResolve(Array.from(this.stocksmap.keys()))

    }
    catch (err: any) {
      console.log("error caught in ", err?.message)
      throw err;
    }
  }
}
