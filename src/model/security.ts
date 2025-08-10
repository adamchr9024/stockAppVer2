import { OnInit } from "@angular/core";

export class Security {
      //dividendYield
      private _costbasis: number = 0;
      private _yahooprice: number = 0;
      private _marketvalue: number = 0;
      private _gainloss: number = 0;
      private _trailingAnnualDividendRate: Number = 0;
      private _percentage: number = 80;
      private _dividendYield: number = 0;
      //private _potentialYearlyDividend:number=0;
      static initialInvestment: number = 500.00;
      constructor(public readonly ticker: string,
            public readonly quantity: number,
            private price: number, //might should only be one price
            private unit_cost: number,
            public readonly category: Category = Category.Stock,
            private fifty_twowkrng: string,
            public readonly comment: string = "",
            public readonly effective_year_low: number = 0,
            public readonly effective_year_high: number = 100,
            public fiftyDayAverage = 4.44,
            public fiftyDayAverageChange = 2.22,
            public twoHundredDayAverage = 44.44,
            public twoHundredDayAverageChange = 22.22,
      ) {  //see what this is generating in Javascript repeated variables
            this.init();
      }
      init(): void {
            this._costbasis = Number((this.quantity * this.unit_cost).toFixed(2));
            this._yahooprice = this.price;
            this._marketvalue = Number((this.quantity * this.price).toFixed(2));
            this._gainloss = Number((this._marketvalue - this._costbasis).toFixed(2));
            // this._fiftytwowkrng = this.fifty_twowkrng;
            this.setPercentage();

      }
      setPercentage() {
            if (this.fifty_twowkrng?.includes("-")) {
                  let small_large = this.fifty_twowkrng.split("-");
                  let min = +small_large[0];
                  let max = +small_large[1];
                  if (this.yahooprice && max != min) {
                        this._percentage = +(100 * (this.yahooprice - min) / (max - min)).toFixed(0)
                        // console.log("setPercentage", min, max, this.yahooprice)
                  }
            }
            else {
                  this._percentage = 50;
            }
      }
      set fiftytwowkrng(val: string) { this.fifty_twowkrng = val; }
      set unitcost(value: number) {
            this.unit_cost = value;
            this._costbasis = Number((this.quantity * value).toFixed(2));
            this._gainloss = Number((this._marketvalue - this._costbasis).toFixed(2));

      }
      set trailingAnnualDividendRate(val: Number) {
            this._trailingAnnualDividendRate = val;
            // this.
      }
      set yahooprice(val: number | undefined) {
            if (val) {
                  this._yahooprice = val;
                  this.price = val;
                  this._marketvalue = Number((this.quantity * val).toFixed(2));
                  this._gainloss = Number((this._marketvalue - this._costbasis).toFixed(2));
                  //code to set percentage
                  this.setPercentage();
            }
            else {
                  throw new Error("Yahoo price must be > 0");
            }
      }
      set percentage(val: number) {
            // console.log("set percentage called with value: ", val);
            this._percentage = val
      }
      set dividendYield(val: number) {
            this._dividendYield = val;
      }
      get fiftytwowkrng() { return this.fifty_twowkrng }
      get dividendYield() { return this._dividendYield }
      get percentage() { return this._percentage }
      get yahooprice() { return this._yahooprice; }
      get gainloss() { return this._gainloss; }
      get marketvalue() { return this._marketvalue; }
      get unitcost() { return this.unit_cost; }
      get costbasis() { return this._costbasis; }
      get potentialYearlyDividend() {//use with Watchlist to calcualte a $500 investment for one year
            let qty = Math.floor(Security.initialInvestment / this._yahooprice)
            if (this._trailingAnnualDividendRate) {//none zero and not undefined
                  let val = Number((qty * Number(this._trailingAnnualDividendRate)).toFixed(2));
                  if (isNaN(val)) {
                        return 0;
                  }
                  else {
                        return val;
                  }
            } //6.24 = divAmt * 4 * price 
            else {
                  let val = Number((this._yahooprice * (this._dividendYield / 100) * qty).toFixed(2));
                  if (isNaN(val)) {
                        return 0;
                  }
                  else {
                        return val;
                  }

            }
      }
      get watchQuantity() { return Math.floor(Security.initialInvestment / this._yahooprice) }
      get effectiveRange() { return this.effective_year_low.toString() + "-" + this.effective_year_high.toString(); }
      get fifty50_200DayAvg() {
            // let fiftyrange = (this.fiftyDayAverage - this.fiftyDayAverageChange).toFixed(4) + "-" + (this.fiftyDayAverage + this.fiftyDayAverageChange).toFixed(4);
            // let twohundredrange = (this.twoHundredDayAverageChange - this.twoHundredDayAverageChange).toFixed(4) + "-" +
            //       (this.twoHundredDayAverageChange - this.twoHundredDayAverageChange).toFixed(4);
            // return fiftyrange + " , " + twohundredrange;
            return this.fiftyDayAverage.toFixed(4) + " , " + this.twoHundredDayAverage.toFixed(4)
      }
      get effectivePercentage() {
            let val = Number((100 * (this._yahooprice - this.effective_year_low) / (this.effective_year_high - this.effective_year_low)).toFixed(1));
            if (isNaN(val)) {
                  return 0;
            }
            else {
                  return val;
            }
      }
}
export interface symbolprice {
      symbol: string;
      price: number | undefined;
};
export enum Category { Stock = "Stock", MutualFund = "Mutual Fund", FixedIncome = "Fixed Income", ETF = "ETF", Bond = "Bond", Other = "Other", Alternative = 'Alternative', CashAndShortTerm = "Cash & Short Term", WatchList = "Watch List", NoApiCall = "NO API Call" };
export type SecurityType = {
      ticker: string,
      quantity: number,
      price: number,
      unit_cost: number,
      category: Category,
      fiftytwowkrng: string
      comment?: string,
      effective_year_low?: number,
      effective_year_high?: number

}