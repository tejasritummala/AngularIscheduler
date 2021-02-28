import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { WorkBook, read, utils, write, readFile } from 'xlsx';

import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // this.saveAsExcelFile(excelBuffer, excelFileName);
    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  readExcel(fileUploaded, UserData) {
    // tslint:disable-next-line: no-shadowed-variable
    const readFile = new FileReader();
    let storeData;
    let jsonData;
    //  this.get_header_row(fileUploaded);
    return new Promise((resolve, reject) => {
      readFile.onload = (e) => {

        storeData = readFile.result;
        const data = new Uint8Array(storeData);
        const arr = new Array();
        for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
        const bstr = arr.join('');
        const workbook = XLSX.read(bstr, { type: 'binary' });
        // tslint:disable-next-line: variable-name
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        const columns = this.get_header_row(worksheet);
        const result = UserData.every(val => columns.includes(val));
        if (result) {
          jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
          resolve(jsonData);
        } else {
          reject(new Error('Columns doesnot match'));
        }

      };
      //  this.get_header_row(fileUploaded);
      readFile.readAsArrayBuffer(fileUploaded);

    });

  }
  get_header_row(sheet) {
    const headers = [];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    let C;
    const R = range.s.r;
    for (C = range.s.c; C <= range.e.c; ++C) {
      const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
      let hdr = 'UNKNOWN ' + C;
      if (cell && cell.t) {
        hdr = XLSX.utils.format_cell(cell);
      }
      headers.push(hdr);
    }
    return headers;
  }
}
