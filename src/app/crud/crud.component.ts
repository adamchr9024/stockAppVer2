//import { Component } from '@angular/core';
//import { form } from '@angular/forms/signals'; angular 21
import { Component, Injectable, OnInit, inject, signal, computed, OnDestroy } from '@angular/core';
import { SecurityType, Category } from '../../model/security';
import { CrudFileService } from '../crud-file.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
//https://www.youtube.com/watch?v=hgy3t9mFmuc&t=20s
// what is SchemaPathTree angular 21

export class CrudComponent implements OnDestroy { // implement on delete to unsubscribe maybe; 
  errorMessage = "";
  action: string = 'read';
  subscription!: Subscription;
  crudfs = inject(CrudFileService);
  title = "C R U D Component Angular 18";
  labelsArray = ["ticker", "quantity", "price", "unit_cost", "category",
    "fiftytwowkrng", "comment", "effective_year_low", "effective_year_high", "fiftyDayAverage",
    "fiftyDayAverageChange", "twoHundredDayAverage", "twoHundredDayAverageChange", "est_annual_income", "actual_dividend"];
  createdSecuritySignal = signal<SecurityType>({
    ticker: "DFT",
    quantity: 0,
    price: 1.0,
    unit_cost: 1.0,
    category: Category.Stock,
    fiftytwowkrng: "1-2",
    comment: "DEFAULT COMMENT",
    effective_year_low: .75,
    effective_year_high: 2.1,
    fiftyDayAverage: 1.25,
    fiftyDayAverageChange: 1.12,
    twoHundredDayAverage: 1.2,
    twoHundredDayAverageChange: 1.0,
    est_annual_income: 0,
    actual_dividend: 0
  });
  createAndUpdateTest = {
    ticker: "GIAX",
    quantity: 0,
    price: 1.0,
    unit_cost: 1.0,
    category: Category.Stock,
    fiftytwowkrng: "1-2",
    comment: "DEFAULT COMMENT",
    effective_year_low: .75,
    effective_year_high: 2.1,
    fiftyDayAverage: 1.25,
    fiftyDayAverageChange: 1.12,
    twoHundredDayAverage: 1.2,
    twoHundredDayAverageChange: 1.0,
    est_annual_income: 0,
    actual_dividend: 0
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }
  //jsonString = JSON.stringify(this.createdSecuritySignal());
  operation() {
    const ticker = this.createdSecuritySignal().ticker;
    try {
      this.subscription = this.crudfs.readASecurity(ticker).subscribe(
        {
          next: (data) => {
            // console.log("data from Crud-file operation: ", data);
            this.readTicker(data);
          },
          error: err => {
            console.log("error occurred in Crud-file operation: ", err);
            this.errorMessage = `Error Getting Secuity: ${err?.message} for ticker: ${ticker} `
          },
          complete: () => { console.log("completd called in crud.component") }
        }
      )
    }
    catch (err: any) {
      console.log("error caught  in  crud.component.ts", err);

    }
  }
  readTicker(data: SecurityType) {
    let oldSignalData = this.createdSecuritySignal();
    // console.log(oldSignalData)
    //console.log(data);
    // console.log("Object.assign", Object.assign(oldSignalData, data));
    this.createdSecuritySignal.set(Object.assign(oldSignalData, data));
  }
  onCreate() {
    console.log("in onCreate");
  }
  onDelete() {
    //add prompt to continue
    console.log("in onDelete");
    let ok = confirm("Are you sure you want to Delete this Security")
    //console.log("ok=", ok); //true or false
  }
  onUpdate() {
    console.log("in onUpdate");
  }
  editTicker(eve: any) {//on blur event
    //console.log("in edit ticker", eve.target.value);
    if (eve.target.value) {
      this.createdSecuritySignal.update(prev => { return { ...prev, ticker: eve.target.value } })
      console.log("update signal ", this.createdSecuritySignal().ticker);
      this.errorMessage = "";
    }
    else {
      this.errorMessage = "Invalid ticker value";
    }
  }
}
