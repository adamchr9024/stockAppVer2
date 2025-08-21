import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
//import { SignalswatchlistService } from '../signalswatchlist.service';
import { RapidapiService } from '../rapidapi.service';
//import { Category, Security } from '../../model/security';
import { financialBodyType } from '../../model/financialBody';
import { Subscription, switchMap, switchScan } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent implements OnDestroy, OnInit {
  // @Input()
  // set ticker(symbol: string) {
  //   this.ticker = symbol;
  // }
  ticker = "";
  json = JSON;
  financialdata!: financialBodyType;
  waiting: string = "ready to fetch";
  financialstring = "";
  constructor(private rapidApiService: RapidapiService, private route: ActivatedRoute) { }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    //this.getFinancials();

  }
  analyze() {
    console.log("in analyze:", this.ticker.trim().toUpperCase());
    if (this.ticker.trim()) {
      this.getFinancials();
    }
    else {
      alert("enter a valid ticker");
    }
  }
  getFinancials() {
    this.waiting = "fetching..."
    this.rapidApiService.getFinancials(this.ticker.trim().toUpperCase()).subscribe({
      next: n => {
        this.financialdata = n;
        this.financialstring = JSON.stringify(n);
        //console.log("BGY Financial Data:  ", n)
      },
      error: (err) => {
        // console.log("error 'getFinancials':", err, err?.error?.message)
        this.waiting = "ERROR OCCURRED fetching 'getFinancials':" + err?.message + "\n Message: " + err?.error?.message;

      },
      complete: () => {
        // console.log("complete called in analysis")
        this.waiting = "done"
      }
    });
  }
}
