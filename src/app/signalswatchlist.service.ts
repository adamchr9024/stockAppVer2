import { Injectable, OnInit, inject, signal, computed } from '@angular/core';
//import { rxResource } from '@angular/core/rxjs-interop';  angualar 19 or 20
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { take, map } from "rxjs/operators";
import { Security, SecurityType } from '../model/security';
@Injectable({
  providedIn: 'root'
})
export class SignalswatchlistService implements OnInit {
  data: any = null;
  http = inject(HttpClient);
  watchListSecurities: Security[] = []
  constructor() { }
  ngOnInit(): void {
    //console.log("in SignalsWatchlistservice read file")
  }
  readSecurities(sectype: string) {//watch list

    let httpheader = new HttpHeaders();
    httpheader = httpheader.append("accepts", "application/json");
    return this.http.get<SecurityType[]>('Stocks.json', { headers: httpheader })
      .pipe(
        take(1),
        map(data => {
          return data.filter(sec => sectype.includes(sec.category))
            .map(thesec => {
              return new Security(thesec.ticker,
                thesec.quantity, thesec.price, thesec.unit_cost,
                thesec.category, thesec.fiftytwowkrng, thesec.comment)
            })
        })
      )
  }
  getAphas(file: string) {
    let httpheader = new HttpHeaders();
    httpheader = httpheader.append("accepts", "application/json");
    return this.http.get<SecurityType[]>(file, { headers: httpheader })
      // return this.http.get<SecurityType[]>('dividendetf.json', { headers: httpheader })
      // return this.http.get<SecurityType[]>('chaseStocksAndETFs.json', { headers: httpheader })
      .pipe(
        take(1),
        map(data => {
          return data
            .map(thesec => {
              return new Security(thesec.ticker,
                thesec.quantity, thesec.price, thesec.unit_cost,
                thesec.category, thesec.fiftytwowkrng, thesec.comment, thesec.effective_year_low, thesec.effective_year_high)

            })
        })
      )
  }
} 
