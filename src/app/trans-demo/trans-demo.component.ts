import { Component, OnInit } from '@angular/core';
import { Security, Category } from '../../model/security';
import { TransactionType } from '../../model/security';
import { Transaction } from '../../model/transaction';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-trans-demo',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './trans-demo.component.html',
  styleUrl: './trans-demo.component.css'
})
/**
 * this component was only used to calculate actual gain and loss when part of 
 * security is sold. It is no longer needed
 */
export class TransDemoComponent implements OnInit {
  static count = 0;
  todos = ['create transactions', "sell; buy; dividend; yahooprice change", "print errors", "at end qty should be 0", "add sellbasis and totalcost where applicable (Stocks.json, StockType etc)", "updata all stocks with new data"];
  //start with quantity 0
  security = new Security("sec1", 5, 100, 100, Category.Stock, '5-15', "test stock", 4.2, 14.8, 8.9, .5, 10.2, .8, 100, 0, 0, 500);

  transTypeArray: Array<TransactionType> = [TransactionType.Buy, TransactionType.Dividend, TransactionType.Sell, TransactionType.Sell];
  transationArrayValue: Array<string> = []
  dividendArray = [15];
  sellArrayQuantity = [5, 5];
  sellArrayPrice = [7, 9]

  ngOnInit(): void {
    // for(let i=1; i<=5; i++){
    // let xtn = new Transaction(this.security, this.transTypeArray[TransDemoComponent.count++], 5, 100);  //buy 5
    let xtn = new Transaction(this.security, this.transTypeArray[TransDemoComponent.count++], 5, 85);  //buy 5

    this.transationArrayValue.push(xtn.value);
    /*xtn = new Transaction(this.security, this.transTypeArray[1], 15);    //dividend 15 dollars
    this.transationArray.push(xtn);
      xtn = new Transaction(this.security, this.transTypeArray[2], 5, 7);   // sell 5 at $7
      this.transationArray.push(xtn);
      xtn = new Transaction(this.security, this.transTypeArray[3], 5, 9);  //sell 5 at $9
      this.transationArray.push(xtn);
        xtn = new Transaction(this.security, this.transTypeArray[4], 5, 10);
      //  this.transationArray.push(xtn);
      //   }*/
  }
  handleTrans() {
    try {

      if (TransDemoComponent.count > 3) {
        return;
      }
      let xtn: Transaction;
      switch (this.transTypeArray[TransDemoComponent.count]) {
        case TransactionType.Dividend:
          // console.log('in dividend case');
          xtn = new Transaction(this.security, this.transTypeArray[TransDemoComponent.count], this.dividendArray[TransDemoComponent.count - 1], 0);

          break;
          // case TransactionType.Buy:
          // xtn=new Transaction(this.security, this.transTypeArray[TransDemoComponent.count], this.transTypeArray[TransDemoComponent.count], this );

          break;
        case TransactionType.Sell:
          xtn = new Transaction(this.security, this.transTypeArray[TransDemoComponent.count], this.sellArrayQuantity[TransDemoComponent.count - 2], this.sellArrayPrice[TransDemoComponent.count - 2]);

          break;
        default:
          throw new Error("Invalid Transaction Type");
      }

      this.transationArrayValue.push(xtn.value);  //wait for transaction to complete
      ++TransDemoComponent.count;
    } catch (err: any) {
      console.error("error caught in handleTrans()", err.message);
    }

    //let xtn = new Transaction(this.security, this.transTypeArray[TransDemoComponent.count++], );  //buy 5

  }


}
