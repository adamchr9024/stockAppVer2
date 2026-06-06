import { from } from "../../dist/stock-app-ng18/browser/chunk-UKM2PROZ";
import { TransactionType, Category, Security, SecurityType } from "./security";
//import { Error } from 
export class transaction {
      /* this is call is desigined to operate on only one security and give update after each transaction 
          the quantity field must not be readonly for this class to work.
      
      */
      private static value = "";
      private static startCash = 1000;
      private static _dividend: number = 0;
      constructor(private security: Security, private transType: TransactionType,
            private amt: number, private price: number = 0) {
            this.handleOperation();
      }
      handleOperation() {
            try {
                  switch (this.transType) {
                        case 'buy':
                              this.handleBuy();
                              break;
                        case 'sell':
                              this.handleSell();
                              break;
                        case 'dividend':
                              this.handleDividend();
                              break;
                        default:
                              throw new Error('Invalid Transaction Type');
                  }
            }
            catch (err: any) {
                  console.log("error caught in handleOperation", err?.message);
            }
      }

      handleBuy() {
            try {
                  let cashNeeded = this.price * this.amt;
                  if (transaction.startCash < cashNeeded) {
                        throw new Error("Not Enough Cash On Hand");
                  }
                  else {
                        // update unit cost
                        this.security.unitcost =
                              Number(((this.security.unitcost * this.security.quantity + this.amt * this.price) / (this.security.unitcost + this.price)).toPrecision(2))

                        //update quantity 
                        this.security.quantity = this.security.quantity + this.amt;

                        //update available cash
                        transaction.startCash -= cashNeeded;

                        // update yahoo price
                        this.security.yahooprice = this.price;

                  }

            }
            catch (err: any) {
                  console.log("error caught in handleBuy", err?.message);
                  throw err;
            }

      }
      handleSell() {
            try {
                  if (this.security.quantity < this.amt) {
                        throw new Error("Sell quantity less than QUANTITY ON HAND");
                  }
                  else {
                        //reduce quantity
                        this.security.quantity = this.security.quantity - this.amt;
                        //add to cash
                        transaction.startCash += this.price * this.amt
                        // update yahooprice
                        this.security.yahooprice = this.price;
                  }

            }
            catch (err: any) {
                  console.log("error caught in handleSell", err?.message);
                  throw err;

            }

      }
      handleDividend() {
            try {
                  transaction._dividend += this.amt;
                  transaction.startCash += this.amt;
            }
            catch (err: any) {
                  console.log("error caught in handleDividend", err?.message);
                  throw err;
            }
      }
      get value(): string { //this only matters after the quantity  is 0 ...the security is sold.
            let secval = this.security.yahooprice! * this.security.quantity + transaction.startCash;
            let quan = this.security.quantity;
            transaction.value = `Start Cash: $1000 , Security Value: ${secval}, quantity: ${quan}`
            return transaction.value;

      }
};