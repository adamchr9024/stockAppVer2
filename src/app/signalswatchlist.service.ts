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
  constructor() {
    // this.readSecurities(Category.WatchList)
    // .subscribe(next=>this.watchListSecurities=next)
  }

  //readonly watchlist = signal<Security[]>(this.watchListSecurities);
  //readonly watchlistvalues = computed(() => {
  //  watchlistComputed: this.watchlist()
  // })
  //    readonly resource = rxResource({
  //      request: () => this.watchlistvalues,
  //      loader: () =>
  //        this.http.get<PassengerList>(
  // //           `https://api.com?page=${params.request.page}
  // //             &size=${params.request.pageSize}`
  // //         )
  //  })
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
  }// EBKOF,BG.VI,OMV,VOE.VI,ADRZY,VER.VI,WIE.VI,1DOC.MI,VIG.VI
}  //ASIX,SAR,NCDL,BBDC,GECC,ACCO,SM,CMCSA,QFIN,WHF      HIGH-YIELD STOCKS
//OZK, FLO, ORI, PRGO,VZ, TROW,QCOM, PB,USBI,BBY,CFR,NNN,FRT,EIX,NEE,O,TGT,JNJ,PPG,CINF,NFG,AMCR, CBU,ESS
//TOP 25 SAFE DIVIDEND
//HIND HOLDINGS
//CAT, FAST, RTX, URI,GE,PH,ETN,GD,AME,DE,DAL,IR,TXT,UNP,CPRT,CP,RSG,UBER,LMT,UPS