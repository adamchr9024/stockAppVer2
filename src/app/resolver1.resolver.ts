import { ResolveFn } from '@angular/router';
import { inject, } from '@angular/core';
import { Security, } from '../model/security';
import { RapidapiService } from './rapidapi.service';

//import { lastValueFrom } from 'rxjs';   

//https://www.youtube.com/watch?v=Iw2_-oXehMc
export const Resolver1Resolver: ResolveFn<Map<string, Security>> = (route, state) => {
  const rapidApiService = inject(RapidapiService)

  //const url = route.url.join("")
  //console.log("resolve-Resolve-url", url);

  /** WORKS TOGETHER WITH realwatchlist.json which is called in constructor of RapidapiService for intialization
   * and updated after fetching the updated security
   *   const source$ = interval(2000).pipe(take(10));
  const finalNumber = await lastValueFrom(source$);
  console.log(`The final number is ${ finalNumber }`);
  high return ETFs
  HIGH DIVIDEND STOCK RELATED TO "ENERGY"*/
  //const keys2 = ["IEP", "VOC", "NFE", "MNR", "ICON", "TXO", "EPM", "ARLP", "VTS", "TEN", "GPRK", "AESI", "HWSM"]
  // const etfs = ["PRFZ", "EBIT", "AVSC", "VTWO", "RSSL", "DES"];
  //These keys must be in Watchlist
  const keys = ["CHPY", "SOXY", "GPIQ", "PBOT", "TRTX", "SDIV", "NEE", "UPS", "GNL", "ENB", "ASG", "VLT", "QDPL", "AHITX", "MDLOX", "HAUZ",
    "WTPI", "FWGIX", "QQQI", "FNPFX", "NXTG", "HSEIX", "MPLX", "AMZA",
    "PRFZ", "AVSC", "VTWO", "TRMD", "MPLX", "O", "AGNC"
  ];
  return rapidApiService.getMutualFundPricesResolve(keys);
}






