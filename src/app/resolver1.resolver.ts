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

  /**
   *   const source$ = interval(2000).pipe(take(10));
  const finalNumber = await lastValueFrom(source$);
  console.log(`The final number is ${ finalNumber }`);
  high return ETFs
  HIGH DIVIDEND STOCK RELATED TO "ENERGY"*/
  const keys2 = ["IEP", "VOC", "NFE", "MNR", "ICON", "TXO", "EPM", "ARLP", "VTS", "TEN", "GPRK", "AESI", "HWSM"]
  // const etfs = ["PRFZ", "EBIT", "AVSC", "VTWO", "RSSL", "DES"];
  //These keys must be in Watchlist
  const keys = ["BGY", "BDJ", "GPIQ", "EXG", "TRTX", "SDIV", "SPYD", "ENB", "ASG", "VLT", "BRW", "CII", "AHITX", "PONAX", "MDLOX", "HAUZ",
    "WTPI", "FWGIX", "QQQI", "FNPFX", "HYZD", "NXTG", "HSEIX", "JRS", "EVC", "PCEF", "TMET", "MPLX", "IAUI", "FBDC", "BIGY", "AMZA",
    "PRFZ", "EBIT", "AVSC", "VTWO", "RSSL", "DES"
  ];
  return rapidApiService.getMutualFundPricesResolve(keys);
}






