import { Rawfmt } from "./rawfmt";

export class Rawfmtlong extends Rawfmt {
      longFmt: string
      constructor(ra: number, fm: string, long: string) {
            super(ra, fm);
            this.longFmt = long;
      }
}