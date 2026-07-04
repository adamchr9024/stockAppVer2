import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { Security } from '../../model/security';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
// import { MatPaginator } from '@angular/material/paginator'
import { PercentDirective } from '../percent.directive';
import { MatSort } from '@angular/material/sort'
import { ActivatedRoute } from '@angular/router';
//import { Subscription } from 'rxjs';
@Component({
  selector: 'app-material-table',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, CommonModule, MatInputModule, CdkTableModule, MatSortModule, PercentDirective],
  //providers: [RapidapiService],
  templateUrl: './material-table.component.html',
  styleUrl: './material-table.component.css'
})
//https://marmo.dev/angular-material-sort-objects#the-complex-scenario-a-structured-object-with-nested-properties
export class MaterialTableComponent implements OnInit, AfterViewInit {
  waiting: string = "fetching ..."  //works with resolve
  stocksmap: Map<string, Security> = new Map();
  tableDataSource: MatTableDataSource<Security>;
  //Table columns will be displayed in the same order of values in the array
  colToDisplay: string[] = ['ticker', 'category', 'quantity', 'getYahooPrice', 'fiftytwowkrng', 'percentage', 'dividendYield', 'potentialYearlyDividend', 'comment'];
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
    this.tableDataSource = new MatTableDataSource();
  }
  activeRoute = inject(ActivatedRoute)

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
        // console.log("sortDataAcessor material-table", property, item[property]);
        switch (property) {
          case 'quantity': return item.watchQuantity;
          default: return item[property];
        }
      }
    }
    catch (err: any) {
      console.error("error caught in MaterialTableComponent ngOnInit ", err?.message)
      this.waiting = err?.message;
    }
  }
  filterData(event: any) {
    const filterValue = event.target.value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase()

  }
}
