//import { OnInit } from "@angular/core";

export class Security {
      private _costbasis: number = 0;
      private _yahooprice: number = 0;
      private _marketvalue: number = 0;
      private _gainloss: number = 0;
      private _trailingAnnualDividendRate: Number = 0;
      private _percentage: number = 80;
      private _dividendYield: number = 0;
      private static initialInvestment: number = 500.00;

      constructor(public readonly ticker: string,
            public readonly quantity: number,
            //public quantity: number,   //changed because of transaction buy and sell
            private price: number, //might should only be one price
            private readonly unit_cost: number, //make readonly after tranaction is done
            public readonly category: Category = Category.Stock,
            private fifty_twowkrng: string,
            public readonly comment: string = "",
            public readonly effective_year_low: number = 0,
            public readonly effective_year_high: number = 100,
            public fiftyDayAverage = 4.44,
            public fiftyDayAverageChange = 2.22,
            public twoHundredDayAverage = 44.44,
            public twoHundredDayAverageChange = 22.22,
            public readonly est_annual_income = 3.33,
            public readonly actual_dividend = 0.0, //make readonly after tranaction class is done
            public readonly selltotal = 0,  //make readonly after tranaction class is done
            public readonly totalcost = 250  //make readonly after tranaction class is done
      ) {  //see what this is generating in Javascript repeated variables
            this._yahooprice = price
            this.init();
      }
      static getSecurityFromSecurityType(sectype: SecurityType): Security {
            return new Security(sectype.ticker, sectype.quantity, sectype.price, sectype.unit_cost, sectype.category, sectype.fiftytwowkrng,
                  sectype.comment, sectype.effective_year_low, sectype.effective_year_high, sectype.fiftyDayAverage, sectype.fiftyDayAverageChange,
                  sectype.twoHundredDayAverage, sectype.twoHundredDayAverageChange, sectype.est_annual_income, sectype.actual_dividend, sectype.selltotal, sectype.totalcost
            )
      }
      init(): void {
            this._costbasis = Number((this.quantity * this.unit_cost).toFixed(2));
            // this._yahooprice = this.price;
            this._marketvalue = Number((this.quantity * this.price).toFixed(2));
            this._gainloss = Number((this._marketvalue - this._costbasis).toFixed(2));
            this.setPercentage();
      }
      setPercentage() {
            if (this.fifty_twowkrng?.includes("-")) {
                  let small_large = this.fifty_twowkrng.split("-");
                  let min = +small_large[0];
                  let max = +small_large[1];
                  if (this.yahooprice && max != min) {
                        this._percentage = +(100 * (this.yahooprice - min) / (max - min)).toFixed(0)
                  }
            }
            else {
                  this._percentage = 50;
            }
      }
      // set quantityval(val: number) {
      //       this.quantity = val
      //       this.init(); //this is really updating
      // }
      get quantityval() { return this.quantity; }
      set fiftytwowkrng(val: string) { this.fifty_twowkrng = val; }
      // set unitcost(value: number) {
      //       this.unit_cost = value;
      //       this.init()
      //       //this._costbasis = Number((this.quantity * value).toFixed(2));
      //       //this._gainloss = Number((this._marketvalue - this._costbasis).toFixed(2));

      // }
      // set actual_dividendval(val: number) { this.actual_dividend = val; }
      set trailingAnnualDividendRate(val: Number) { this._trailingAnnualDividendRate = val; }
      set yahooprice(val: number) {
            this._yahooprice = val;
            this.price = val;
            this.init()
            //this._marketvalue = Number((this.quantity * val).toFixed(2));
            //this._gainloss = Number((this._marketvalue - this._costbasis).toFixed(2));
            //code to set percentage
            //this.setPercentage();

      }
      set percentage(val: number) { this._percentage = val }
      set dividendYield(val: number) { this._dividendYield = val; }
      get fiftytwowkrng() { return this.fifty_twowkrng; }
      get dividendYield() { return this._dividendYield; }
      get percentage() { return this._percentage }
      get yahooprice() { return this._yahooprice; }
      get gainloss() { return this._gainloss; }
      get marketvalue() { return this._marketvalue; }
      get unitcost() { return this.unit_cost; }
      get costbasis() { return this._costbasis; }
      get selltotalval() { return this.selltotal }
      get potentialYearlyDividend() {//use with Watchlist to calcualte a $500 investment for one year
            if (this.est_annual_income !== 3.33 && this.est_annual_income !== 0) { // added specifically for dividend aristocrats
                  return this.est_annual_income;
            }
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
      get glwdiv() { return Number((this._marketvalue + this.selltotal + this.actual_dividend - this.totalcost).toFixed(2)); }
      get fifty50_200DayAvg() {
            if (this.fiftyDayAverage && this.twoHundredDayAverage) {
                  return this.fiftyDayAverage.toFixed(4) + " , " + this.twoHundredDayAverage.toFixed(4);
            }
            else {
                  return "1,1-avgs undefined";
            }
      }
      get glwdvdpct() {
            return this.glwdiv / this.totalcost;//validate
      }
      // get newCostBases() { //used with transaction 
      //       return this.unitcost * this.quantity
      //}
      get effectivePercentage() {
            let val = Number((100 * (this._yahooprice - this.effective_year_low) / (this.effective_year_high - this.effective_year_low)).toFixed(1));
            if (isNaN(val)) {
                  return 0;
            }
            else {
                  return val;
            }
      }
      get newUnitCost() {
            let buyquantity = Math.floor(250 / this._yahooprice)
            return (((this.unit_cost * this.quantity + buyquantity * this._yahooprice) / (buyquantity + this.quantity))).toFixed(2);

      }
      static getTotalMarketValue(arr: Security[]): number {
            let sum = 0;
            arr.forEach((sec) => {
                  sum += sec._marketvalue;
            })
            return sum;
      }
      static getTotalGainLoss(arr: Security[]): number {
            let sum = 0;
            arr.forEach((sec) => {
                  sum += sec._gainloss;
            })
            return sum;
      }
      static getEstimateAnnualIncome(arr: Security[]): number { //estimate annual income
            let sum = 0;
            arr.forEach((sec) => {
                  sum += sec.est_annual_income;
            })
            return sum;
      }
      static getGLwDTotal(arr: Security[]): number { //total gain loss with dividend
            let sum = 0; //total cost basis - total gain loss with dividend???
            arr.forEach((sec) => {
                  sum += sec.glwdiv;
            })
            return sum;
      }

}
export interface symbolprice {
      symbol: string;
      price: number | undefined;
};
export enum Category {
      Stock = "Stock", MutualFund = "Mutual Fund", FixedIncome = "Fixed Income", ETF = "ETF", Bond = "Bond", Other = "Other", Alternative = 'Alternative', CashAndShortTerm = "Cash & Short Term", WatchList = "Watch List", CEF = "Closed End Fund",
      IndexFund = "Index Fund"
};
export enum TransactionType {
      Buy = 'buy', Sell = "sell", Dividend = "dividend"
};
export type SecurityType = {
      ticker: string,
      quantity: number,
      price: number,
      unit_cost: number,
      category: Category,
      fiftytwowkrng: string
      comment?: string,
      effective_year_low?: number,
      effective_year_high?: number,
      fiftyDayAverage?: number,
      fiftyDayAverageChange?: number,
      twoHundredDayAverage?: number,
      twoHundredDayAverageChange?: number,
      est_annual_income?: number,
      actual_dividend?: number,
      selltotal?: number,
      totalcost?: number

}
export const test_securitys = [
      { "priceEpsCurrentYear": 35.588608, "bookValue": 4.431, "fiftyDayAverage": 243.541, "fiftyDayAverageChange": 19.907211, "fiftyDayAverageChangePercent": 0.0817407, "twoHundredDayAverage": 222.37805, "twoHundredDayAverageChange": 41.07016, "twoHundredDayAverageChangePercent": 0.18468621, "marketCap": 3909674074112, "forwardPE": 31.70255, "priceToBook": 59.455696, "sourceInterval": 15, "exchangeDataDelayedBy": 0, "averageAnalystRating": "2.0 - Buy", "tradeable": false, "cryptoTradeable": false, "regularMarketChangePercent": 1.4901862, "regularMarketPrice": 263.4482, "marketState": "REGULAR", "hasPrePostMarketData": true, "firstTradeDateMilliseconds": 345479400000, "priceHint": 2, "regularMarketChange": 3.868225, "regularMarketDayHigh": 264.13, "regularMarketDayRange": "259.18 - 264.13", "regularMarketDayLow": 259.18, "regularMarketVolume": 25871653, "regularMarketPreviousClose": 259.58, "bid": 263.43, "ask": 263.29, "bidSize": 1, "askSize": 1, "fullExchangeName": "NasdaqGS", "financialCurrency": "USD", "regularMarketOpen": 261.19, "averageDailyVolume3Month": 54759101, "averageDailyVolume10Day": 47327910, "fiftyTwoWeekLowChange": 94.238205, "fiftyTwoWeekLowChangePercent": 0.5569304, "fiftyTwoWeekRange": "169.21 - 265.29", "fiftyTwoWeekHighChange": -1.8417969, "fiftyTwoWeekHighChangePercent": -0.006942579, "fiftyTwoWeekLow": 169.21, "fiftyTwoWeekHigh": 265.29, "fiftyTwoWeekChangePercent": 12.1732, "dividendDate": 1755129600, "trailingAnnualDividendRate": 1.01, "trailingPE": 39.976967, "dividendRate": 1.04, "trailingAnnualDividendYield": 0.0038909009, "dividendYield": 0.4, "epsTrailingTwelveMonths": 6.59, "epsForward": 8.31, "epsCurrentYear": 7.4026, "shortName": "Apple Inc.", "longName": "Apple Inc.", "displayName": "Apple", "symbol": "AAPL" },
      { "fiftyDayAverage": 20.4252, "fiftyDayAverageChange": 0.30480003, "fiftyDayAverageChangePercent": 0.014922745, "twoHundredDayAverage": 19.30565, "twoHundredDayAverageChange": 1.4243488, "twoHundredDayAverageChangePercent": 0.07377885, "netExpenseRatio": 1.48, "sourceInterval": 15, "exchangeDataDelayedBy": 0, "tradeable": false, "cryptoTradeable": false, "regularMarketChangePercent": 0.4360465, "regularMarketPrice": 20.73, "marketState": "REGULAR", "hasPrePostMarketData": false, "firstTradeDateMilliseconds": 867677400000, "priceHint": 2, "regularMarketChange": 0.09, "regularMarketPreviousClose": 20.64, "fullExchangeName": "Nasdaq", "averageDailyVolume3Month": 0, "averageDailyVolume10Day": 0, "fiftyTwoWeekLowChange": 3.7299995, "fiftyTwoWeekLowChangePercent": 0.21941173, "fiftyTwoWeekRange": "17.0 - 20.73", "fiftyTwoWeekHighChange": 0, "fiftyTwoWeekHighChangePercent": 0, "fiftyTwoWeekLow": 17, "fiftyTwoWeekHigh": 20.73, "fiftyTwoWeekChangePercent": 7.6323986, "dividendRate": 0.13504, "dividendYield": 2.07, "ytdReturn": 11.71071, "trailingThreeMonthReturns": 5.13476, "netAssets": 5208834000, "shortName": "JPMorgan Investor Growth and In", "longName": "JPMorgan Investor Growth & Income C", "messageBoardId": "finmb_28117639", "exchangeTimezoneName": "America\/New_York", "exchangeTimezoneShortName": "EDT", "gmtOffSetMilliseconds": -14400000, "market": "us_market", "esgPopulated": false, "symbol": "ONECX" }
]
export class fivelowmedianaverage {
      //ticker:string="";
      //fivedaylow:number[]=[0,0,0,0,0];
      constructor(private ticker: string, private fivelowvalues: number[]) {

      }
      average(): number {
            return this.fivelowvalues.reduce(this.getSum, 0) / 5
      }
      getSum(total: number, num: number) { return total + num; }
      median(): number {
            return this.fivelowvalues.sort((a, b) => a - b)[2];
      }
      public getMedianAverage(): string {
            return this.ticker.toUpperCase() + " AVERAGE=" + this.average() + " MEDIAN=" + this.median();
      }
}
export const test_securityType: SecurityType[] = [
      {
            "ticker": "AAPL",
            "quantity": 80,
            "price": 18.35,
            "unit_cost": 19.36,
            "category": Category.Stock,
            "fiftytwowkrng": "16.00-20.90",
            "comment": "dividend",
            "effective_year_low": 1,
            "effective_year_high": 2,
            "fiftyDayAverage": 1.5,
            "fiftyDayAverageChange": 0.5,
            "twoHundredDayAverage": 1.75,
            "twoHundredDayAverageChange": 0.75,
            "est_annual_income": 211.68,
            "actual_dividend": 67.25,
            "selltotal": 0,
            "totalcost": 1
      },
      {
            "ticker": "ONECX",
            "quantity": 87,
            "price": 18.90,
            "unit_cost": 20.04,
            "category": Category.MutualFund,
            "fiftytwowkrng": "16.00-20.90",
            "comment": "dividend-SELL-18.6",
            "effective_year_low": 1,
            "effective_year_high": 2,
            "fiftyDayAverage": 1.5,
            "fiftyDayAverageChange": 0.5,
            "twoHundredDayAverage": 1.75,
            "twoHundredDayAverageChange": 0.75,
            "est_annual_income": 167.04,
            "actual_dividend": 125.28,
            "selltotal": 0,
            "totalcost": 1
      }
]
