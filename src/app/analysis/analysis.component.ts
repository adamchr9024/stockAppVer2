import { Component, OnDestroy, OnInit } from '@angular/core';
import { RapidapiService } from '../rapidapi.service';
//import { Category, Security } from '../../model/security';
import { CommonModule } from '@angular/common';
import { financialBodyType } from '../../model/financialBody';
import { Subscription, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent implements OnDestroy, OnInit {
  subscription!: Subscription;
  ticker = "";
  json = JSON;
  financialdata: financialBodyType | null = null;
  waiting: string = "ready to fetch";
  financialstring = "";
  constructor(private rapidApiService: RapidapiService) { }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
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
}
