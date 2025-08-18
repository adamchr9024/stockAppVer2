import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import * as XLSX from "xlsx";
import { Category, Security } from '../../model/security';
import { CommonModule } from '@angular/common';
//https://www.youtube.com/watch?v=PBpcM2xRHj0    EXPORT
//https://www.youtube.com/watch?v=qjuJRYm68mw    IMPORT
@Component({
  selector: 'app-ods-xlsx',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './ods-xlsx.component.html',
  styleUrl: './ods-xlsx.component.css'
})
export class OdsXlsxComponent {
  data!: [][];
  headData: string[] = [];
  stocksArray: Array<Security> = [new Security("aapl", 3, 5.67, 5.61, Category.Stock, "4-5.9", "test export",
    2, 6, 3.1, 5.2, 5.4, 1.1, 45.0)];  //my data

  exportToOds() {

    try {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.stocksArray);
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      let filename = "stock_ods" + new Date().getMilliseconds();
      XLSX.utils.book_append_sheet(workbook, worksheet, filename);
      XLSX.writeFile(workbook, filename + ".ods"); //where is this going (downloads)
    }
    catch (err: any) {
      console.log("error caught in exportToOds: ", err?.message)
    }
  }
  onFileChange(eve: any) {

    try {
      const target: DataTransfer = <DataTransfer>(eve.target);
      if (target.files.length !== 1) { throw new Error("cannot use multiple files") }
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        const workBook: XLSX.WorkBook = XLSX.read(fileContent, { type: 'binary' });
        const workSheetName: string = workBook.SheetNames[0];
        const workSheet: XLSX.WorkSheet = workBook.Sheets[workSheetName];
        // console.log(workSheet);
        this.data = (XLSX.utils.sheet_to_json(workSheet, { header: 1 }));
        this.headData = this.data[0];
        //console.log("headData", this.headData);
        this.data.splice(0, 1);
        //console.log(this.data);

      };
      reader.readAsArrayBuffer(target.files[0]);
      //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsArrayBuffer

    }
    catch (err: any) {
      console.log("error caught in fileUpload: ", err?.message)
    }
  }

}
