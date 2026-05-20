import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { take, map, catchError, switchMap, } from "rxjs/operators";
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudFileService {
  localUrl = 'http://localhost:3000/stock_by_ticker/';
  localUrlCreate = 'http://localhost:3000/create_stock';
  apiHeader = 'api-key';
  keyvalue = environment.crud_local_api_key;
  headers = new HttpHeaders().set('api-key', `${this.keyvalue}`);

  constructor(private http: HttpClient) { }


  readASecurity(ticker: string) {
    try {
      // this.initalizeheader();
      return this.http.get(this.localUrl + ticker, { headers: this.headers })
        .pipe(switchMap((res) => {
          //console.log("res switch map", res);

          return of(res)
        }),
          map((x: any) => {
            // console.log("in map after switch", x.data);
            return x.data;
          }),
          catchError(err => {
            console.log("error caught and rethrown in crudFileService.readASecurity catchError: ", err);
            throw err;
          })
        )
    } catch (err: any) {
      console.log("error caught rethrown in crudFileService.readASecurity  try catch", err?.message);
      throw err;
    }
  }

  createASecurity(body: {}) {
    try {
      this.headers = this.headers.append('Content-Type', 'Application/Json');
      return this.http.post(this.localUrlCreate, body, { headers: this.headers })
        .pipe(take(1),
          map((x: any) => {
            return x?.body;
          }),
          catchError(err => {
            console.log("error caught and rethrown in crudFileService.createASecurity catchError: ", err);
            throw err;
          })
        )
    } catch (err: any) {
      console.log("error caught rethrown in rapidapiService.getMutualFundPrices try catch", err?.message);
      throw err;
    }
  }
  deleteASecurity(ticker: string) {
    try {
      // this.initalizeheader();
      return this.http.delete(this.localUrl + ticker, { headers: this.headers })
        .pipe(
          switchMap((res) => {
            //console.log("res,switchmap,delete", res);
            return of(res);
          }),
          map((x: any) => {
            //console.log("x in http delete map:", x);
            return x;
          }),
          catchError(err => {
            console.log("error caught and rethrown in crudFileService.createASecurity catchError: ", err);
            throw err;
          })
        )
    } catch (err: any) {
      console.log("error caught rethrown in rapidapiService.getMutualFundPrices try catch", err?.message);
      throw err;
    }
  }
  updateASecurity(ticker: string, body: {}) {
    try {
      this.headers = this.headers.append('Content-Type', 'Appliction/Json');
      return this.http.patch(this.localUrl + ticker, body, { headers: this.headers })
        .pipe(take(1),
          map((x: any) => {
            return x?.body;
          }),
          catchError(err => {
            console.log("error caught and rethrown in crudFileService.createASecurity catchError: ", err);
            throw err;
          })
        )
    } catch (err: any) {
      console.log("error caught rethrown in rapidapiService.getMutualFundPrices try catch", err?.message);
      throw err;
    }
  }
}


