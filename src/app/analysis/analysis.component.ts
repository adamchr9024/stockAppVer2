import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
//import { SignalswatchlistService } from '../signalswatchlist.service';
import { RapidapiService } from '../rapidapi.service';
//import { Category, Security } from '../../model/security';
import { financialBodyType } from '../../model/financialBody';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})
export class AnalysisComponent implements OnDestroy, OnInit {
  subscription!: Subscription
  financialdata!: financialBodyType;
  waiting: string = "fetching";
  financialstring = "";
  constructor(private rapidApiService: RapidapiService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.rapidApiService.getFinancials("BGY").subscribe({
      next: n => {
        this.financialdata = n;
        this.financialstring = JSON.stringify(n);
        //console.log("BGY Financial Data:  ", n)
      },
      error: (err) => {
        console.log("error 'getFinancials':", err)
        this.waiting = "ERROR OCCURRED fetching 'getFinancials':" + err?.message;

      },
      complete: () => {
        // console.log("complete called in analysis")
        this.waiting = "done"
      }
    })
  }
}
