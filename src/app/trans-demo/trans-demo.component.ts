import { Component } from '@angular/core';
import { Security, Category } from '../../model/security';
import { TransactionType } from '../../model/security';
@Component({
  selector: 'app-trans-demo',
  standalone: true,
  imports: [],
  templateUrl: './trans-demo.component.html',
  styleUrl: './trans-demo.component.css'
})
export class TransDemoComponent {
  todos = ['create transactions', "sell; buy; dividend", "print result after each trnx", "use hr", "print errors", "at end qty should be 0"];

}
