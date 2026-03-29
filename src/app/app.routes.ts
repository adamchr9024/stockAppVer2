import { Routes } from '@angular/router';
import { MystocksComponent } from './mystocks/mystocks.component';
import { StocktableComponent } from './stocktable/stocktable.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { HomeComponent } from './home/home.component';
import { MaterialTableComponent } from './material-table/material-table.component';
import { TableMatComponent } from './table-mat/table-mat.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { AristocratStockComponent } from './aristocrat-stock/aristocrat-stock.component';
import { OdsXlsxComponent } from './ods-xlsx/ods-xlsx.component';
import { XlsxStyComponent } from './xlsx-sty/xlsx-sty.component';
//import { SecurityResolver1 } from './security.resolver';
import { Resolver1Resolver } from './resolver1.resolver';
import { SpreadshtComponent } from "./spreadsht/spreadsht.component";
import { StmcComponent } from './stmc/stmc.component';
import { FuturesComponent } from './futures/futures.component';
import { FiveDayMedianAverageComponent } from './five-day-median-average/five-day-median-average.component'
export const routes: Routes = [
      { path: "", redirectTo: "sprdsht", pathMatch: "full" },
      { path: "home", component: HomeComponent, },
      { path: 'mystock', component: MystocksComponent },
      { path: "table", component: StocktableComponent },
      { path: "watchlist", component: WatchlistComponent },
      { path: "sprdsht", component: SpreadshtComponent },
      //{ path: "material-watchlist", component: MaterialTableComponent, resolve: { stocksmap: SecurityResolver1 } }, //problem with refresh
      { path: "material-watchlist", component: MaterialTableComponent, resolve: { stocksmap: Resolver1Resolver } },
      { path: "table-mat", component: TableMatComponent },
      { path: "aristocrats", component: AristocratStockComponent },
      { path: "xlsx-style", component: XlsxStyComponent },
      { path: "analyze", component: AnalysisComponent },
      { path: "ods-xlsx", component: OdsXlsxComponent },
      { path: "smtc", component: StmcComponent },
      { path: "futures", component: FuturesComponent },
      { path: "fdlowmedavg", component: FiveDayMedianAverageComponent }
];   
