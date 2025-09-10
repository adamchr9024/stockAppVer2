//import { ResolveFn } from '@angular/router';  //NOT USED
import { inject, } from '@angular/core';
import { Security, Category } from '../model/security';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { SignalswatchlistService } from './signalswatchlist.service';
import { Observable, of } from 'rxjs';
//import { delay } from 'rxjs/operators';
import { RapidapiService } from './rapidapi.service';
@Injectable({
  providedIn: 'root'
})
export class SecurityResolver implements Resolve<Observable<Security[]>> {

  stocks: Security[] = [];
  signalsService = inject(SignalswatchlistService);
  constructor(private rapidApiService: RapidapiService) {
    this.signalsService.readSecurities(Category.WatchList)
      .subscribe(next => {//all I need is the tickers
        this.stocks = next;
        // console.log(next)
        this.initialize();
      })
  }

  initialize() {

    console.log("initialize Security Resolver " + this.stocks.length)
    let symbols = this.stocks.map(t => t.ticker);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Observable<Security[]>> {
    throw new Error('Method not implemented.');
  }



  // return true;
}
