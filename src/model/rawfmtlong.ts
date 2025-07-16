import { Rawfmt } from "./rawfmt";

export class Rawfmtlong extends Rawfmt {
      long: string
      constructor(ra: number, fm: string, long: string) {
            super(ra, fm);
            this.long = long;
      }
}