import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MaterialTableComponent } from './material-table/material-table.component';
import { TableMatComponent } from './table-mat/table-mat.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { AristocratStockComponent } from './aristocrat-stock/aristocrat-stock.component';
import { XlsxStyComponent } from './xlsx-sty/xlsx-sty.component';
import { Resolver1Resolver } from './resolver1.resolver';
import { SpreadshtComponent } from "./spreadsht/spreadsht.component";
import { StmcComponent } from './stmc/stmc.component';
import { FuturesComponent } from './futures/futures.component';
import { FiveDayMedianAverageComponent } from './five-day-median-average/five-day-median-average.component';
import { CrudComponent } from './crud/crud.component';
export const routes: Routes = [
      { path: "", redirectTo: "sprdsht", pathMatch: "full" },
      { path: "home", component: HomeComponent, },
      { path: "sprdsht", component: SpreadshtComponent },
      { path: "material-watchlist", component: MaterialTableComponent, resolve: { stocksmap: Resolver1Resolver } },
      { path: "table-mat", component: TableMatComponent },
      { path: "aristocrats", component: AristocratStockComponent },
      { path: "xlsx-style", component: XlsxStyComponent },
      { path: "analyze", component: AnalysisComponent },
      { path: "smtc", component: StmcComponent },
      { path: "futures", component: FuturesComponent },
      { path: "fdlowmedavg", component: FiveDayMedianAverageComponent },
      { path: "crud", component: CrudComponent }
];   
