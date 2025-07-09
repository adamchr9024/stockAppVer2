import { Injectable, OnInit } from '@angular/core';
import { symbolprice } from '../model/security';
import { environment } from '../environments/environment.development';
/*import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
    c-Current price
    d-Change 
    dp-Percent change
    h-High price of the day
    l-Low price of the day
    o-Open price of the day
    pc-Previous close price

*/
import { DefaultApi } from 'finnhub-ts'
@Injectable({
  providedIn: 'root'
})
export class FinnhubService implements OnInit {
  apikey: string = environment.finnhub_apikey
  authHeader: string = "X-Finnhub-Token";
  constructor(private defaultApi: DefaultApi) { }
  ngOnInit(): void {//getting 401 add headers or apikey to url
    this.defaultApi = new DefaultApi({
      basePath: "https://finnhub.io/api/v1/quote", accessToken: this.apikey, apiKey: this.apikey, isJsonMime: (input) => {
        try {
          JSON.parse(input)
          return true
        } catch (error) { }
        return false
      }
    })
    /* this.defaultApi = new DefaultApi({
       apiKey: this.apikey isJsonMime: (input) => {
          try {
            JSON.parse(input)
            return true
          } catch (error) { }
          return false
       }
     })*/

  }
  async getStockPrice(symbol: string) {//60 calls per minute max


    try {
      // let data = await this.defaultApi.quote(symbol.toUpperCase(), { headers: { "X-Finnhub-Token": this.apikey }, params: { token: this.apikey } });
      let stockdata = await this.defaultApi.quote(symbol.toUpperCase(), { params: { token: this.apikey } });
      return { symbol: symbol, price: stockdata.data.c }
    }
    catch (error: any) {
      console.log("Error in finnHubService (getStockPrice): ", error?.message)
      throw new Error("error encountered getting symbol: " + symbol + " " + error?.message);
    }
  }
  async getAllPrices(symbols: string[]) {
    //call get stock prices for every symbol every second
    let symprice = [];
    try {
      symprice = await this.getSymTid(symbols);

      return Promise.resolve(symprice);
      // let data = await this.defaultApi.quote(symbol.toUpperCase(), { headers: { "X-Finnhub-Token": this.apikey }, params: { token: this.apikey } });
      // let funddata = { data: 4.56 };//await this.defaultApi.bondPrice(symbol.toUpperCase(), { params: { token: this.apikey } });

      //console.log("data from finnhub", funddata.data);
      //return funddata.data;
    }
    catch (error: any) {
      console.log("error during getAllPrices: ", error)
      throw new Error("error encountered getting symbols: " + error);
    }
  }
  async getSymTid(stocks: string[]) {
    let symprice: symbolprice[] = [];
    for (let stoc of stocks) {
      await this.sleep(1000)  //used to make calls to getAstock every 2 seconds, so threshold is not reached     
      let val = await this.getStockPrice(stoc)
      //    .then(val => { symprice.push(val) })
      symprice.push(val)
    }
    return symprice;
  }



  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

}
