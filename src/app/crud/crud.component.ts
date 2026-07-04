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
  validSecurity = signal(false);
  // jsonString = "";
  // labelsArray = ["ticker", "quantity", "price", "unit_cost", "category",
  //   "fiftytwowkrng", "comment", "effective_year_low", "effective_year_high", "fiftyDayAverage",
  //   "fiftyDayAverageChange", "twoHundredDayAverage", "twoHundredDayAverageChange", "est_annual_income", "actual_dividend"];
  createdSecuritySignal = signal<SecurityType>({
    ticker: "NEW-1",
    quantity: 5,
    yahooPrice: 1.0,
    unit_cost: 1.25,
    category: Category.Stock,
    fiftytwowkrng: "1-3",
    comment: "GROWTH & Dividend",
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
    yahooPrice: 1.0,
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
  operation() {
    const ticker = this.createdSecuritySignal().ticker;
    try {
      this.subscription = this.crudfs.readASecurity(ticker).subscribe(
        {
          next: (data) => {
            this.updateSecuritySignal(data);
          },
          error: err => {
            console.error("error occurred in Crud-file operation: ", err);
            this.errorMessage = `Error Getting Secuity: ${err?.message} for ticker: ${ticker} `
          },
          complete: () => { console.log("complete called in read ticker") }
        }
      )
    }
    catch (err: any) {
      console.error("error caught  in  crud.component.ts", err);

    }
  }
  updateSecuritySignal(data: SecurityType) {
    let oldSignalData = this.createdSecuritySignal();
    this.createdSecuritySignal.set(Object.assign(oldSignalData, data));
  }
  onCreate() {

    //let ticker = this.createdSecuritySignal().ticker;
    try {
      this.subscription = this.crudfs.createASecurity(JSON.stringify(this.createdSecuritySignal())).subscribe(
        {
          next: (data: { status: string, data: SecurityType }) => {

            if (data.status == 'success') {
              this.openSnackBar(`Security successfully created`);
            }

          },
          error: err => {
            console.error("error occurred in create security: ", err);
            this.errorMessage = `Error Creating Secuity: ${err?.message} for ticker: ${this.createdSecuritySignal().ticker}`
          },
          complete: () => { console.log("complete called in crud.component create operation") }
        }
      )
    }
    catch (err: any) {
      console.error("error caught  in CreateSecurity  crud.component.ts", err);

    }
  }
  onDelete() {
    let ticker = this.createdSecuritySignal().ticker;
    if (this.errorMessage || !ticker) {
      alert("Please fix error");

    }
    else {
      let ok = confirm(`Are you sure you want to Delete this Security ${ticker}`)
      if (ok) {
        try {
          this.subscription = this.crudfs.deleteASecurity(ticker).subscribe(
            {
              next: (data: { status: string, data: any }) => {

                if (data.status == 'successfully deleted') {
                  // alert(`{ticker} successfully deleted`); //change to timed modal from ng material 
                  this.openSnackBar(`${ticker} successfully deleted`);
                }

              },
              error: err => {
                console.error("error occurred in Crud-file operation: ", err);
                this.errorMessage = `Error Deleting Secuity: ${err?.message} for ticker: ${ticker} `
              },
              complete: () => { console.log("complete called in crud.component delete operation") }
            }
          )
        }
        catch (err: any) {
          console.error("error caught  in deleteSecurity  crud.component.ts", err);

        }
      }
    }
  }
  validateSecurity() {
    let errors = "";
    if (!this.createdSecuritySignal().ticker.match(/^(?=.{1,15}$)[A-Z0-9]+([.\-:^/][A-Z0-9]+)*$/gim)) {//ai generated. AND NOT EMPTY REGULAR EXPRESSION 
      errors += "\n invalid ticker";
    }
    if (this.createdSecuritySignal().quantity <= 0) {
      errors += "\n quanity must be > 0";
    }
    if (this.createdSecuritySignal().yahooPrice <= 0) {
      errors += "\n price must be > 0";
    }
    if (this.createdSecuritySignal().unit_cost <= 0) {
      errors += "\n unit cost must be > 0";
    }
    if (this.createdSecuritySignal().category.trim() == "") {  // may remove
      errors += "\n category is required (not \"\"";
    }
    if (!this.createdSecuritySignal().fiftytwowkrng.match(/^[1-9]+[0-9]*[.]?[0-9]*\s*[-]\s*[1-9]+[0-9]*[.]?[0-9]*|0?\.[0-9]+\s*[-]\s*\.[0-9]+$/gim)) { //REGULAR EXPRESSION
      errors += "\n invalid range entry";
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
    if (this.createdSecuritySignal().fiftyDayAverage! < 0) { //10  make read only
      errors += "\n  Fifty Day Average must be >0";
    }
    if (this.createdSecuritySignal().fiftyDayAverageChange! < 0) {  //make read only
      errors += "\n  Fifty Day Average Change must be >0 ";
    }
    if (this.createdSecuritySignal().twoHundredDayAverage! < 0) {  //make read only
      errors += "\n  Two Hundred Day Average must be >0";
    }
    if (this.createdSecuritySignal().twoHundredDayAverageChange! < 0) {  //make readonly
      errors += "\n Two Hundred Day Average must be >0";
    }
    if (this.createdSecuritySignal().est_annual_income! < 0) {
      errors += "\n Estimate Annual Income must be >=0 ";
    }
    if (this.createdSecuritySignal().actual_dividend! < 0) {  //15
      errors += "\n actual dividend must be >=0";
    }
    if (errors) {
      this.validSecurity.set(false);
    }
    else {
      this.validSecurity.set(true);
    }
    //force a rerender
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
      this.subscription = this.crudfs.updateASecurity(ticker, JSON.stringify(this.createdSecuritySignal())).subscribe(
        {
          next: (data: { status: string, data: any }) => {
            if (data.status == 'success') {
              this.openSnackBar(`${ticker} successfully updated`);
            }
          },
          error: err => {
            console.error("error occurred in Crud-file operation: ", err);
            this.errorMessage = `Error Updating Secuity: ${err?.message} for ticker: ${ticker} `
          },
          complete: () => { console.log("complete called in crud.component update operation") }
        }
      )
    }
    catch (err: any) {
      console.error("error caught  in  crud.component.ts update method", err);
    }
  }
  updateSignalField(field: string, value: any) {
    this.createdSecuritySignal.update(prev => { return { ...prev, [field]: value } })
    // this.jsonString = JSON.stringify(this.createdSecuritySignal());  //remove later
    this.validateSecurity();
  }
  editTicker(eve: any) {//on blur event
    this.updateSignalField('ticker', eve.target.value);
  }

  editQuantity(eve: any) {
    this.updateSignalField('quantity', +eve.target.value);  //CONVERT TO NUMBER
  }
  editPrice(eve: any) {
    this.updateSignalField('price', +eve.target.value);
  }
  editUnitCost(eve: any) {
    this.updateSignalField('unit_cost', +eve.target.value);
  }
  //
  editFiftytwowkrng(eve: any) {
    this.updateSignalField('fiftytwowkrng', eve.target.value);  //CONVERT TO NUMBER
  }
  editComment(eve: any) {
    this.updateSignalField('comment', eve.target.value);
  }
  editEffective_year_low(eve: any) {
    this.updateSignalField('effective_year_low', +eve.target.value);
  }
  editEffective_year_high(eve: any) {
    this.updateSignalField('effective_year_high', +eve.target.value);  //CONVERT TO NUMBER
  }
  editEst_annual_income(eve: any) {
    this.updateSignalField('est_annual_income', +eve.target.value);
  }
  editActual_dividend(eve: any) {
    this.updateSignalField('actual_dividend', +eve.target.value);
  }
  editCategory(eve: any) {
    this.createdSecuritySignal.update(prev => { return { ...prev, category: eve.target.value } })
  }
}
