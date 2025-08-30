import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Security, symbolprice } from '../model/security';
//import { Observable, of, } from 'rxjs';
import { take, map, catchError } from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class RapidapiService {
  // urlOne = 'https://latest-stock-price.p.rapidapi.com/equities-search?Search=';
  //moved curl command to watchlist.json
  urlOne = 'https://yahoo-finance166.p.rapidapi.com/api/stock/get-price?region=US&symbol='
  hostheader1 = 'x-rapidapi-host';
  hostvalue1 = 'yahoo-finance166.p.rapidapi.com';
  keyheader1 = 'x-rapidapi-key'
  keyvalue = environment.rapidapi_keyvalue
  // headers = new HttpHeaders({this.hostheader:this.hostvalue}) 
  headers = new HttpHeaders();
  headers2 = new HttpHeaders();
  hostheader2 = 'x-rapidapi-host';
  hostvalue2 = 'yahoo-finance15.p.rapidapi.com';
  keyheader2 = 'x-rapidapi-key'

  //apikey = 'afffa0c1a8mshae9aa24d2821b2fp10fbfajsn3b93c9c1e52b'
  urlTwo = "https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=";

  constructor(private http: HttpClient) { }
  async getAllStockPrices(stocks: Security[]) {
    let symprice = [];
    // symprice = await this.getSymTid(stocks);
    symprice = await this.getOneSymTid(stocks[0]);

    return Promise.resolve(symprice);
  }
  async getSymTid(stocks: Security[]) {
    let symprice: symbolprice[] = [];
    for (let stoc of stocks) {
      await this.sleep(2000)  //used to make calls to getAstock every 2 seconds, so threshold is not reached     
      this.getAstockPrice(stoc.ticker).subscribe(val => { symprice.push(val) })
    }
    //console.log("symprice in getSymTid", symprice);
    return symprice;
  }
  async getOneSymTid(stoc: Security) {
    let symprice: symbolprice[] = [];
    this.getAstockPrice(stoc.ticker).subscribe(val => {
      console.log("val", val);
      symprice.push(val)
    })
    await this.sleep(1000); //make sure the value is pushed async
    return symprice;
    // }
    // console.log("symprice in getSymTid", symprice);
    // return symprice;
  }

  // getAstockPriceTest(ticker: string) {
  //   return new Observable((observe) => {
  //     observe.next({ symbol: ticker, price: 45.7 }),
  //       observe.error("error from observer"),
  //       observe.complete()

  //   }).pipe(
  //     take(1),
  //     map((x: any) => {
  //       return {
  //         symbol: x.symbol,
  //         price: x.price
  //       }
  //     }),
  //     catchError(err => of(err.message))
  //   )
  // }

  getAstockPrice(ticker: string) {
    this.headers = this.headers.append(this.hostheader1, this.hostvalue1);
    this.headers = this.headers.append(this.keyheader1, this.keyvalue);
    let newurl = this.urlOne + ticker;
    return this.http.get(newurl, { headers: this.headers })
      .pipe(
        take(1),
        map((x: any) => {
          return {
            symbol: x?.quoteSummary?.result[0]?.price?.symbol,
            price: x?.quoteSummary?.result[0]?.price?.regularMarketPrice?.raw
          }
        }),
        catchError(err => {
          console.log("error caught and rethrown in rapidapiService.getAstockPrice: ", err);
          throw err
        })
      )
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  initalizeheader2() {
    this.headers2 = this.headers2.append(this.hostheader2, this.hostvalue2);
    this.headers2 = this.headers2.append(this.keyheader2, this.keyvalue);
  }
  getMutualFundPrices(tickers: string[]) {
    let joinOn = '%2C'
    this.initalizeheader2();
    let urltickers = tickers.slice(0, tickers.length - 1).join(joinOn)
    let mutualurl = this.urlTwo + urltickers + joinOn + tickers[tickers.length - 1];
    return this.http.get(mutualurl, { headers: this.headers2 })
      .pipe(
        take(1),
        map((x: any) => {
          return x?.body
        }),
        catchError(err => {
          console.log("error caught and rethrown in rapidapiService.getMutualFundPrices: ", err);
          throw err;
        })
      )
    // console.log("mutualurl", mutualurl);
  }
  getFinancials(ticker: string) {
    this.initalizeheader2();
    let url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules?ticker=${ticker}&module=financial-data`
    return this.http.get(url, { headers: this.headers2 })
      .pipe(//MAYBE ADD SWITCH MAP
        take(1),
        map((s: any) => {
          //return JSON.parse(s?.body)
          //console.log(s?.body)
          return s?.body;
        }),
        catchError(err => {
          console.log("error caught and rethrown in rapidapiService.getFinancials(): ", err);
          throw err;
        })


      )
  }
}
