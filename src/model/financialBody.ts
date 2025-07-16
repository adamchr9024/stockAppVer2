
import { Rawfmt } from './rawfmt';
import { Rawfmtlong } from './rawfmtlong';
export class financialBody {
      /*
     maxAge:number; //":86400,
     currentPrice:Rawfmt; //"raw":31.89,"fmt":"31.89"},
     targetHighPrice:Rawfmt; //"raw":40,"fmt":"40.00"},
     targetLowPrice:Rawfmt; //"raw":31.9,"fmt":"31.90"},
     targetMeanPrice:Rawfmt; //"raw":36.34706,"fmt":"36.35"},
     targetMedianPrice:Rawfmt; //"raw":36,"fmt":"36.00"},
     recommendationMean:Rawfmt|[]; //"raw":1.84211,"fmt":"1.84"},
     recommendationKey:string; //":"buy",
     numberOfAnalystOpinions:Rawfmtlong; //"raw":17,"fmt":"17","longFmt":"17"},
     totalCash:Rawfmtlong; //"raw":222000000,"fmt":"222M","longFmt":"222,000,000"},
     totalCashPerShare:Rawfmt; //"raw":0.102,"fmt":"0.1"},
     ebitda:Rawfmtlong|[]; //"raw":9409999872,"fmt":"9.41B","longFmt":"9,409,999,872"},
     totalDebt:Rawfmtlong; //"raw":32045000704,"fmt":"32.05B","longFmt":"32,045,000,704"},
     quickRatio:Rawfmt|[]; //"raw":0.544,"fmt":"0.54"},
     currentRatio:Rawfmt|[]; //"raw":0.858,"fmt":"0.86"},
     totalRevenue:Rawfmtlong; //"raw":56875999232,"fmt":"56.88B","longFmt":"56,875,999,232"},
     debtToEquity:Rawfmt|[]; //"raw":107.443,"fmt":"107.44%"},
     revenuePerShare:Rawfmt; //"raw":26.228,"fmt":"26.23"},
     returnOnAssets:Rawfmt; //"raw":0.058909997,"fmt":"5.89%"},
     returnOnEquity:Rawfmt; //"raw":0.20198,"fmt":"20.20%"},
     grossProfits:Rawfmtlong; //"raw":7154999808,"fmt":"7.15B","longFmt":"7,154,999,808"},
     freeCashflow:Rawfmtlong|[]; //"raw":1466499968,"fmt":"1.47B","longFmt":"1,466,499,968"},
     operatingCashflow:Rawfmtlong; //"raw":8318000128,"fmt":"8.32B","longFmt":"8,318,000,128"},
     earningsGrowth:Rawfmt; //"raw":-0.042,"fmt":"-4.20%"},    //potential array
     revenueGrowth:Rawfmt; //"raw":0.045,"fmt":"4.50%"},
     grossMargins:Rawfmt; //"raw":0.1258,"fmt":"12.58%"},
     ebitdaMargins:Rawfmt; //"raw":0.16545,"fmt":"16.55%"},
     operatingMargins:Rawfmt; //"raw":0.108780004,"fmt":"10.88%"},
     profitMargins:Rawfmt; //"raw":0.10264,"fmt":"10.26%"},
     financialCurrency:string; //":"USD"}}
    */
}
export type financialBodyType = {

      maxAge: number; //":86400,   all these should probably have |[]
      currentPrice: Rawfmt; //"raw":31.89,"fmt":"31.89"},
      targetHighPrice: Rawfmt; //"raw":40,"fmt":"40.00"},
      targetLowPrice: Rawfmt; //"raw":31.9,"fmt":"31.90"},
      targetMeanPrice: Rawfmt; //"raw":36.34706,"fmt":"36.35"},
      targetMedianPrice: Rawfmt; //"raw":36,"fmt":"36.00"},
      recommendationMean: Rawfmt | []; //"raw":1.84211,"fmt":"1.84"},
      recommendationKey: string; //":"buy",
      numberOfAnalystOpinions: Rawfmtlong; //"raw":17,"fmt":"17","longFmt":"17"},
      totalCash: Rawfmtlong; //"raw":222000000,"fmt":"222M","longFmt":"222,000,000"},
      totalCashPerShare: Rawfmt; //"raw":0.102,"fmt":"0.1"},
      ebitda: Rawfmtlong | []; //"raw":9409999872,"fmt":"9.41B","longFmt":"9,409,999,872"},
      totalDebt: Rawfmtlong; //"raw":32045000704,"fmt":"32.05B","longFmt":"32,045,000,704"},
      quickRatio: Rawfmt | []; //"raw":0.544,"fmt":"0.54"},
      currentRatio: Rawfmt | []; //"raw":0.858,"fmt":"0.86"},
      totalRevenue: Rawfmtlong; //"raw":56875999232,"fmt":"56.88B","longFmt":"56,875,999,232"},
      debtToEquity: Rawfmt | []; //"raw":107.443,"fmt":"107.44%"},
      revenuePerShare: Rawfmt; //"raw":26.228,"fmt":"26.23"},
      returnOnAssets: Rawfmt; //"raw":0.058909997,"fmt":"5.89%"},
      returnOnEquity: Rawfmt; //"raw":0.20198,"fmt":"20.20%"},
      grossProfits: Rawfmtlong; //"raw":7154999808,"fmt":"7.15B","longFmt":"7,154,999,808"},
      freeCashflow: Rawfmtlong | []; //"raw":1466499968,"fmt":"1.47B","longFmt":"1,466,499,968"},
      operatingCashflow: Rawfmtlong; //"raw":8318000128,"fmt":"8.32B","longFmt":"8,318,000,128"},
      earningsGrowth: Rawfmt; //"raw":-0.042,"fmt":"-4.20%"},    //potential array
      revenueGrowth: Rawfmt; //"raw":0.045,"fmt":"4.50%"},
      grossMargins: Rawfmt; //"raw":0.1258,"fmt":"12.58%"},
      ebitdaMargins: Rawfmt; //"raw":0.16545,"fmt":"16.55%"},
      operatingMargins: Rawfmt; //"raw":0.108780004,"fmt":"10.88%"},
      profitMargins: Rawfmt; //"raw":0.10264,"fmt":"10.26%"},
      financialCurrency: string; //":"USD"}}

}