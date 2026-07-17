import { Component, OnDestroy, OnInit } from '@angular/core';
import { RapidapiService } from '../rapidapi.service';
import { Category, Security } from '../../model/security';
import { CommonModule } from '@angular/common';
import { financialBodyType } from '../../model/financialBody';
import { Subscription, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AristocratTableComponent } from '../aristocrat-table/aristocrat-table.component';
import { RapidApiGets } from '../../utility/rapidApiGets';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [FormsModule, CommonModule, AristocratTableComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent implements OnDestroy, OnInit {
  subscription!: Subscription;
  subscription2!: Subscription;

  ticker = "";
  ticker2split = "";
  json = JSON;
  financialdata: financialBodyType | null = null;
  waiting: string = "ready to fetch";
  financialstring = "";
  stocks: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9")];
  stocksmap: Map<string, Security> = new Map();
  constructor(private rapidApiService: RapidapiService, private utilRapidGets: RapidApiGets) { }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
  ngOnInit(): void { }
  analyze() {
    if (this.ticker.trim()) {
      this.getFinancials();
    }
    else {
      alert("enter a valid ticker");
    }
  }
  getFinancials() {
    this.waiting = "fetching..."
    this.financialdata = null;
    this.subscription = this.rapidApiService.getFinancials(this.ticker.trim().toUpperCase()).subscribe({
      next: n => {
        //console.log("n", n);
        if (n === undefined) {
          this.waiting = "No Data Found For Ticker:  " + this.ticker;
        }
        else {
          this.financialdata = n;
          this.financialstring = JSON.stringify(n);
        }
      },
      error: (err) => {
        console.error("error in Analysis for ticker " + this.ticker, err);
        this.waiting = "ERROR OCCURRED fetching 'getFinancials':" + err?.message + "\n Message: " + err?.error?.message;

      },
      complete: () => {
        // console.log("complete called in Analysis")
        if (this.waiting === "fetching...")
          this.waiting = "done";
      }
    });
  }
  handleChange(eve: any) { //only called after losing focus
    this.ticker2split = eve.target.value;
    // console.log("handleChange", this.ticker2split);
  }
  //FNDX,FELV,SPYV,VTV,IUSV
  quickGet() {
    //remove white spaces stick with uppercase only for tickers to avoid 
    //CASE-SENSITIVITY ISSUES

    let tickerArray = (this.ticker2split.toUpperCase().replaceAll(" ", "").split(','))
      .filter(ele => ele.trim() !== "");
    //console.log("after filter ", tickerArray);
    if (Array.isArray(tickerArray) && tickerArray.length > 0) {
      this.stocksmap.clear();
      this.stocks.length = 0;
      this.rapidApiService.getSecuritiesFromTickerArray(this.stocksmap, tickerArray);
      // load stocksmap then make the call
      //console.log("tickers", tickerArray.length, "stockmap", this.stocksmap.size);

      this.subscription2 = this.utilRapidGets.getKeys(this.stocksmap)
        .subscribe(() => { //the values a updated by passing by reference and nothing is returned from observable
          this.waiting = "done"
          //Sconsole.log("stockmap", this.stocksmap.get(tickerArray[0]));
          this.stocks = Array.from(this.stocksmap.values());

        })
    }
  }
}
