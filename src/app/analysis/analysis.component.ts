import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RapidapiService } from '../rapidapi.service';
//import { Category, Security } from '../../model/security';
import { financialBodyType } from '../../model/financialBody';
import { Subscription, switchMap, switchScan } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent implements OnDestroy, OnInit {
  subscription!: Subscription;
  ticker = "";
  json = JSON;
  financialdata!: financialBodyType;
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
    this.subscription = this.rapidApiService.getFinancials(this.ticker.trim().toUpperCase()).subscribe({
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
