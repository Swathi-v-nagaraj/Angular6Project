

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    constructor(private http: HttpClient) {}

    lineChart1Url = '../../assets/data/charts/line_1.json';
    lineChart2Url = '../../assets/data/charts/line_2.json';
    columnUrl = '../../assets/data/charts/column.json';
    areachartUrl = '../../assets/data/charts/line_1.json';
  
      getLineChart1() {
          return this.http.get(this.lineChart1Url);
      }
  
      getLineChart2() {
          return this.http.get(this.lineChart2Url);
      }
  
      getColumnChart() {
          return this.http.get(this.columnUrl);
      }
  
      getAreachart() {
          return this.http.get(this.areachartUrl);
      }
}