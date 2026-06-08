import { TransactionType, Category, Security, SecurityType } from "./security";
//import { Error } from 
export class Transaction {
      /* this is call is desigined to operate on only one security and give update after each transaction 
          the quantity field must not be readonly for this class to work.
      
      */
      private static value = "";
      private static cashOnHand = 500;  //first transaction is done when security is created ' thus 1000-500
      private static costbasis = 500;
      private static sellbasisAndDividend = 0;
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
                              Number(((this.security.unitcost * this.security.quantity + this.amt * this.price) / (this.security.quantity + this.amt)).toFixed(2));

                        //update quantity 
                        this.security.quantity = this.security.quantity + this.amt;

                        //update available cash
                        Transaction.cashOnHand -= cashNeeded;
                        // update cost basis
                        Transaction.costbasis = this.security.unitcost * this.security.quantity
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
                  if (this.security.quantity < this.amt) {
                        throw new Error("Sell quantity less than QUANTITY ON HAND");
                  }
                  else {
                        //reduce quantity
                        this.security.quantity = this.security.quantity - this.amt;
                        //add to cash
                        Transaction.sellbasisAndDividend += this.price * this.amt;
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
                  Transaction.sellbasisAndDividend += amt;
            }
            catch (err: any) {
                  console.log("error caught in handleDividend", err?.message);
                  throw err;
            }
      }
      get value(): string { //this only matters after the quantity  is 0 ...the security is sold.
            let secval = this.security.yahooprice! * this.security.quantity;
            let quan = this.security.quantity;
            //gainloss = market_value + sellbasis - costbasis
            let gainorloss = secval + Transaction.sellbasisAndDividend - Transaction.costbasis;
            Transaction.value = `Cash on hand: $${Transaction.cashOnHand}, Security Value: $${secval}, quantity: ${quan}  gain/loss: ${gainorloss} Trans#:  ${this._tranNum}`
            return Transaction.value;

      }
      get transNum(): number {
            return this._tranNum;
      }
}