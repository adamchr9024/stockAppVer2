import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild, } from '@angular/core';
//import { SignalswatchlistService } from '../signalswatchlist.service';
import { RapidapiService } from '../rapidapi.service';
import { Category, Security } from '../../model/security';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
// import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ActivatedRoute } from '@angular/router';
//import { Subscription } from 'rxjs';
@Component({
  selector: 'app-material-table',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, CommonModule, MatInputModule, CdkTableModule, MatSortModule],
  providers: [RapidapiService],
  templateUrl: './material-table.component.html',
  styleUrl: './material-table.component.css'
})
//https://marmo.dev/angular-material-sort-objects#the-complex-scenario-a-structured-object-with-nested-properties
export class MaterialTableComponent implements OnInit, AfterViewInit, OnDestroy {
  waiting: string = "fetching ..."
  stocksmap: Map<string, Security> = new Map();
  tableDataSource: MatTableDataSource<Security>;
  columnsToDisplay: string[] = ["ticker", "category", "quantity", "yahoo price", "52 Week Range", "Price Precentile", "Dividend Yield", "Potential Yearly Dividend ($500)", "comment"]
  //Table columns will be displayed in the same order of values in the array
  colToDisplay: string[] = ['ticker', 'category', 'quantity', 'yahooprice', 'fiftytwowkrng', 'percentage', 'dividendYield', 'potentialYearlyDividend', 'comment'];
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
    this.tableDataSource = new MatTableDataSource();
  }
  activeRoute = inject(ActivatedRoute)
  ngOnDestroy(): void {

  }
  ngAfterViewInit(): void {

    this.tableDataSource.sort = this.sort;
  }
  ngOnInit(): void {
    try {
      this.stocksmap = this.activeRoute.snapshot.data['stocksmap'];
      // console.log("stocksmap", this.stocksmap)
      this.tableDataSource.data = Array.from(this.stocksmap.values());
      this.waiting = "done";
      this.tableDataSource.sortingDataAccessor = (item: any, property) => {
        switch (property) {
          case 'quantity': return item.watchQuantity;
          case 'yahoo price': return item.yahooprice;
          case "52 Week Range": return item.fiftytwowkrng;
          case "Price Precentile": return item.percentage;
          case "Dividend Yield": return item.dividendYield;
          case "Potential Yearly Dividend ($500)": return item.potentialYearlyDividend;
          // case "ticker": return item.ticker;
          //case "category": return item.category;
          //case "comment": return item.comment;
          default: return item[property];
        }
      }
    }
    catch (err: any) {
      console.log("error caught in MaterialTableComponent ngOnInit ", err?.message)
      this.waiting = err?.message;
    }
  }
  filterData(event: any) {
    const filterValue = event.target.value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase()

  }
}
