import { Component } from '@angular/core';
import { AristocratStockComponent } from '../aristocrat-stock/aristocrat-stock.component';
@Component({
  selector: 'app-stmc',
  standalone: true,
  imports: [AristocratStockComponent],
  templateUrl: './stmc.component.html',
  styleUrl: './stmc.component.css'
})
export class StmcComponent {

}
