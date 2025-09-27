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
              //new Security(              val[0],           val[1],       val[2],           val[3],          val[4],               val[5],         val[9],                    val[6],                     val[7],                    4.4,                          2.2,                         4.3,                             4.11,               val[8],          tbd         );
              //return new Security(thesec.ticker,  thesec.quantity, thesec.price, thesec.unit_cost, thesec.category, thesec.fiftytwowkrng, thesec.comment, thesec.effective_year_low, thesec.effective_year_high, thesec.fiftyDayAverage, thesec.fiftyDayAverageChange, thesec.twoHundredDayAverage, thesec.twoHundredDayAverageChange, thesec.annualincome, thesec.actual)

              return new Security(thesec.ticker, thesec.quantity, thesec.price, thesec.unit_cost, thesec.category, thesec.fiftytwowkrng, thesec.comment,
                thesec.effective_year_low ? thesec.effective_year_low : 1.1,
                thesec.effective_year_high ? thesec.effective_year_high : 2.2,
                thesec.fiftyDayAverage ? thesec.fiftyDayAverage : 0,
                thesec.fiftyDayAverageChange ? thesec.fiftyDayAverageChange : 0,
                thesec.twoHundredDayAverage ? thesec.twoHundredDayAverage : 0,
                thesec.twoHundredDayAverageChange ? thesec.twoHundredDayAverageChange : 0,
                thesec.est_annual_income ? thesec.est_annual_income : 0,
                thesec.actual_dividend ? thesec.actual_dividend : 0
              )
            })
        })
      )
  }
  getAphas(file: string) {
    let httpheader = new HttpHeaders();
    httpheader = httpheader.append("accepts", "application/json");
    return this.http.get<SecurityType[]>(file, { headers: httpheader })
      .pipe(
        take(1),
        map(data => {
          return data
            .map(thesec => {
              return new Security(thesec.ticker,
                thesec.quantity, thesec.price, thesec.unit_cost,
                thesec.category, thesec.fiftytwowkrng, thesec.comment, thesec.effective_year_low, thesec.effective_year_high,
                thesec.fiftyDayAverage ? thesec.fiftyDayAverage : 3.3,
                thesec.fiftyDayAverageChange ? thesec.fiftyDayAverageChange : 3.44)

            })
        })
      )
  }
} 
