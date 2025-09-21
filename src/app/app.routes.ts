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
import { SecurityResolver1 } from './security.resolver';
import { resolver1Resolver } from './resolver1.resolver';
//import { Component } from '@angular/core';
export const routes: Routes = [
      { path: "", component: HomeComponent, },
      { path: 'mystock', component: MystocksComponent },
      { path: "table", component: StocktableComponent },
      { path: "watchlist", component: WatchlistComponent },
      { path: "material-watchlist", component: MaterialTableComponent, resolve: { stocksmap: SecurityResolver1 } }, //not working
      // { path: "material-watchlist", component: MaterialTableComponent, resolve: { stocksmap: resolver1Resolver } },
      { path: "table-mat", component: TableMatComponent },
      { path: "aristocrats", component: AristocratStockComponent },
      { path: "xlsx-style", component: XlsxStyComponent },
      { path: "analyze", component: AnalysisComponent },
      { path: "ods-xlsx", component: OdsXlsxComponent }
];   
