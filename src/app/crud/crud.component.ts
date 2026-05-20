//import { Component } from '@angular/core';
//import { form } from '@angular/forms/signals'; angular 21
import { Component, Injectable, OnInit, inject, signal, computed, OnDestroy } from '@angular/core';
import { SecurityType, Category } from '../../model/security';
import { CrudFileService } from '../crud-file.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [MatIconModule, MatSnackBarModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
//https://www.youtube.com/watch?v=hgy3t9mFmuc&t=20s
// what is SchemaPathTree angular 21

export class CrudComponent implements OnDestroy {
  constructor(private snackBar: MatSnackBar) { }
  errorMessage = "";
  action: string = 'read';
  subscription!: Subscription;
  crudfs = inject(CrudFileService);
  title = "C R U D Component Angular 18";
  validSecurity = false;
  // labelsArray = ["ticker", "quantity", "price", "unit_cost", "category",
  //   "fiftytwowkrng", "comment", "effective_year_low", "effective_year_high", "fiftyDayAverage",
  //   "fiftyDayAverageChange", "twoHundredDayAverage", "twoHundredDayAverageChange", "est_annual_income", "actual_dividend"];
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
  openSnackBar(message: string) {
    this.snackBar.open(message, "", { duration: 5000 });


  }
  //jsonString = JSON.stringify(this.createdSecuritySignal());
  operation() {
    const ticker = this.createdSecuritySignal().ticker;
    try {
      this.subscription = this.crudfs.readASecurity(ticker).subscribe(
        {
          next: (data) => {
            // console.log("data from Crud-file operation: ", data);
            this.updateSecuritySignal(data);
          },
          error: err => {
            console.log("error occurred in Crud-file operation: ", err);
            this.errorMessage = `Error Getting Secuity: ${err?.message} for ticker: ${ticker} `
          },
          complete: () => { console.log("complete called in read ticker") }
        }
      )
    }
    catch (err: any) {
      console.log("error caught  in  crud.component.ts", err);

    }
  }
  updateSecuritySignal(data: SecurityType) {
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
    let ticker = this.createdSecuritySignal().ticker;
    if (this.errorMessage || !ticker) {
      alert("Please fix error");
      //console.log("ok=", ok); //true or false
    }
    else {
      //console.log("in onDelete");
      let ok = confirm(`Are you sure you want to Delete this Security ${ticker}`)
      if (ok) {
        try {
          this.subscription = this.crudfs.deleteASecurity(ticker).subscribe(
            {
              next: (data: { status: string, data: any }) => {
                // console.log(data);
                if (data.status == 'successfully deleted') {
                  // alert(`{ticker} successfully deleted`); //change to timed modal from ng material 
                  this.openSnackBar(`${ticker} successfully deleted`);
                }
                //console.log("data from delete security: ", data);
              },
              error: err => {
                console.log("error occurred in Crud-file operation: ", err);
                this.errorMessage = `Error Deleting Secuity: ${err?.message} for ticker: ${ticker} `
              },
              complete: () => { console.log("complete called in crud.component delete operation") }
            }
          )
        }
        catch (err: any) {
          console.log("error caught  in deleteSecurity  crud.component.ts", err);

        }
      }
    }
  }
  validateSecurity() {
    let errors = "";
    if (this.createdSecuritySignal().ticker) {//alphabet and : ...

    }
    if (this.createdSecuritySignal().quantity <= 0) {
      errors += "\n quanity must be > 0";
    }
    if (this.createdSecuritySignal().price <= 0) {
      errors += "\n price must be > 0";
    }
    if (this.createdSecuritySignal().unit_cost <= 0) {
      errors += "\n unit cost must be > 0";
    }
    if (this.createdSecuritySignal().category.trim()) {  //5
      errors += "\n category is required (not \"\"";
    }
    if (this.createdSecuritySignal().fiftytwowkrng) {
      errors += "\n ";
    }
    if (this.createdSecuritySignal().comment == null) {//not necessary
      errors += "\n comment cannot be null";
    }
    if (this.createdSecuritySignal().effective_year_low! <= 0) {
      errors += "\n Effective Year Low must be >0 ";
    }
    if (this.createdSecuritySignal().effective_year_high! <= 0) {
      errors += "\n  Effective Year High must be >0 ";
    }
    if (this.createdSecuritySignal().fiftyDayAverage) { //10  make read only
      errors += "\n  Fifty Day Average must be >0";
    }
    if (this.createdSecuritySignal().fiftyDayAverageChange) {  //make read only
      errors += "\n  Fifty Day Average Change must be >0 ";
    }
    if (this.createdSecuritySignal().twoHundredDayAverage) {  //make read only
      errors += "\n  Two Hundred Day Average must be >0";
    }
    if (this.createdSecuritySignal().twoHundredDayAverageChange) {  //make readonly
      errors += "\n Two Hundred Day Average must be >0";
    }
    if (this.createdSecuritySignal().est_annual_income! <= 0) {
      errors += "\n Estimate Annual Income must be >=0 ";
    }
    if (this.createdSecuritySignal().actual_dividend! <= 0) {  //15
      errors += "\n actual dividend must be >=0";
    }
    this.validSecurity = !errors ? true : false;
    this.errorMessage = !errors ? "" : errors;
  }
  onUpdate() {
    //get the ticker
    let ticker = this.createdSecuritySignal().ticker;
    //make changes
    //validate security then enable update button
    // show snack bar on success and error on failure
    console.log("in onUpdate");

    try {
      this.subscription = this.crudfs.updateASecurity(ticker, this.createdSecuritySignal()).subscribe(
        {
          next: (data: { status: string, data: any }) => {
            // console.log(data);
            if (data.status == 'success') {
              // alert(`{ticker} successfully deleted`); //change to timed modal from ng material 
              this.openSnackBar(`${ticker} successfully updated`);
            }
            //console.log("data from delete security: ", data);
          },
          error: err => {
            console.log("error occurred in Crud-file operation: ", err);
            this.errorMessage = `Error Updating Secuity: ${err?.message} for ticker: ${ticker} `
          },
          complete: () => { console.log("complete called in crud.component update operation") }
        }
      )
    }
    catch (err: any) {
      console.log("error caught  in  crud.component.ts update method", err);

    }
  }
  editTicker(eve: any) {//on blur event
    //console.log("in edit ticker", eve.target.value);
    if (eve.target.value.trim()) {
      this.createdSecuritySignal.update(prev => { return { ...prev, ticker: eve.target.value } })
      // console.log("update signal ", this.createdSecuritySignal().ticker);
      this.errorMessage = "";
    }
    else {
      this.errorMessage = "Invalid ticker value";
    }
  }
}
