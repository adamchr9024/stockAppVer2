import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FinnhubService } from '../finnhub.service'
import { MytableComponent } from '../mytable/mytable.component';
import { Category, Security } from '../../model/security';
import { SignalswatchlistService } from '../signalswatchlist.service';
import { DefaultApi } from 'finnhub-ts'
@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [HeaderComponent, MytableComponent],
  providers: [SignalswatchlistService, DefaultApi, FinnhubService],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements OnInit {
  signalsService = inject(SignalswatchlistService);
  finnhubService = inject(FinnhubService);
  waiting = "fetching"
  readonly watchlist = signal<Security[]>([]);
  // readonly watchlistvalues = computed(() => {
  //  watchlistComputed: this.watchlist()
  //})
  //this should pull in stocks from a file and filter by CategoryWatchList
  //and pass that value to stocktable which will need to be rewitten
  //stocks: Security[] = []; //("wtlt", 3, 3.45, 3.38, Category.WatchList, "2.75-4.20");
  ngOnInit(): void {
    this.signalsService.readSecurities(Category.WatchList)
      .subscribe(data => {
        //console.log("watchlist", data)
        this.watchlist.set(data);
        // this.waiting = "done"
        this.initialize();
      })
  }
  initialize() {// ADD ERROR HANDLING
    //console.log("in initialize", this.stocks.length)
    let i = 0 //DID NOT UPDATED TO MAP BECAUSE mystock component has better data from rapid api
    let thesymbols = this.watchlist().map(x => x.ticker);
    this.finnhubService.getAllPrices(thesymbols)
      .then(x => {
        x.forEach(val => {

          this.watchlist()[i++].yahooprice = val.price;
        })
        this.waiting = "done";
      })
      .catch(err => {
        console.log("error caught in watchlist.component intialize", err)
        this.waiting = "ERROR from finnhub getAllPrices: " + err;
      })
  }
}
