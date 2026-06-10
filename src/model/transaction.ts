import { TransactionType, Category, Security, SecurityType } from "./security";
//import { Error } from 
export class Transaction {
      /* this  class is desigined to operate on securities and give update after 
      a buy, sell or dividend transaction 
          the quantity field must not be readonly for this class to work.
      
      */
      private static value = ""; //used to give status after update
      private static cashOnHand = 500; // not relevant only used for testing purposes
      private static totalcost = 500;    //first transaction is done when security is created ' thus 1000-500
      // private static selltotal = 0;  //dividend should be taken from security.actual_dividend
      // private static _dividend: number = 0;
      private static count = 1;
      private _tranNum = 0;
      // private _amt = 0;
      constructor(private security: Security, private transType: TransactionType, private amt: number, private price: number) {
            this._tranNum = Transaction.count++;
            this.handleOperation(amt, price);
      }
      handleOperation(amt: number, price: number): void {
            console.log("in handleOperation", this.transType, amt, price)
            try {
                  switch (this.transType) {
                        case 'buy':
                              this.handleBuy();
                              break;
                        case 'sell':
                              this.handleSell();
                              break;
                        case 'dividend':
                              this.handleDividend(amt);
                              break;
                        default:
                              throw new Error('Invalid Transaction Type');
                  }
            }
            catch (err: any) {
                  console.log("error caught in handleOperation", err?.message);
            }
      }

      handleBuy(): void {// maybe return observable
            //  console.log("in handleBuy()")
            try {
                  let cashNeeded = this.price * this.amt;
                  if (Transaction.cashOnHand < cashNeeded) {
                        throw new Error("Not Enough Cash On Hand");
                  }
                  else {
                        // update unit cost
                        this.security.unitcost =
                              Number(((this.security.unitcost * this.security.quantityval + this.amt * this.price) / (this.security.quantity + this.amt)).toFixed(2));

                        //update quantity 
                        this.security.quantityval = this.security.quantityval + this.amt;

                        //update available cash
                        Transaction.cashOnHand -= cashNeeded;
                        // update cost basis
                        // Transaction.totalcost = this.security.unitcost * this.security.quantityval
                        this.security.totalcost += this.amt * this.price;
                        // update yahoo price
                        // this.security.yahooprice = this.price;

                  }

            }
            catch (err: any) {
                  console.log("error caught in handleBuy", err?.message);
                  throw err;
            }

      }
      handleSell(): void {
            try {
                  if (this.security.quantityval < this.amt) {
                        throw new Error("Sell quantity less than QUANTITY ON HAND");
                  }
                  else {
                        //reduce quantity
                        this.security.quantityval = this.security.quantityval - this.amt;
                        //add to cash
                        this.security.selltotal += this.price * this.amt;
                        Transaction.cashOnHand += this.price * this.amt;
                        // update yahooprice
                        //this.security.yahooprice = this.price;
                  }

            }
            catch (err: any) {
                  console.log("error caught in handleSell", err?.message);
                  throw err;

            }

      }
      handleDividend(amt: number): void {
            // debugger;
            console.log("in handle dividend", amt,);
            try {
                  // Transaction._dividend += amt;
                  Transaction.cashOnHand += amt;
                  //S Transaction.selltotalAndDividend += amt;
                  this.security.actual_dividend += amt;
            }
            catch (err: any) {
                  console.log("error caught in handleDividend", err?.message);
                  throw err;
            }
      }
      get value(): string { //this only matters after the quantity  is 0 ...the security is sold.
            let secval = this.security.yahooprice! * this.security.quantityval;
            let quan = this.security.quantityval;
            //gainloss = market_value + selltotal - totalcost
            let gainorloss = secval + this.security.selltotal + this.security.actual_dividend - this.security.totalcost;
            Transaction.value = `Cash on hand: $${Transaction.cashOnHand}, Security Value: $${secval}, quantity: ${quan}  gain/loss: ${gainorloss} 
             totalcost:  ${this.security.totalcost},  
            Trans#:  ${this._tranNum}`
            return Transaction.value;

      }
      get transNum(): number {
            return this._tranNum;
      }
}