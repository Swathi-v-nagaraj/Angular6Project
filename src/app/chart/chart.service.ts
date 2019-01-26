import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
  constructor(private http: HttpClient) { }

  lineChart1Url = '../../assets/data/charts/line_1.json';
  lineChart2Url = '../../assets/data/charts/line_2.json';
  columnUrl = '../../assets/data/charts/column.json';
  areachartUrl = '../../assets/data/charts/area_chart.json';

    //service to make a call to the line_1 JSON file
    getLineChart1() {
        return this.http.get(this.lineChart1Url);
    }

    //service to make a call to the line_2 JSON file
    getLineChart2() {
        return this.http.get(this.lineChart2Url);
    }

    //service to make a call to the column JSON file
    getColumnChart() {
        return this.http.get(this.columnUrl);
    }

    //service to make a call to the area_chart JSON file
    getAreachart() {
        return this.http.get(this.areachartUrl);
    }
}