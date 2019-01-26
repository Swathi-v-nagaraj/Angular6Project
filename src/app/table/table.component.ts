import { Component, OnInit } from '@angular/core';
import { TableService } from './table.service';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public linechart1data;  //which holds the data of line chart 1 from the JSON
  public linechart2data;  //which holds the data of line chart 2 from the JSON
  public columnchartdata; //which holds the data of column chart from the JSON
  public areachartdata; //which holds the data of area chart from the JSON

  public seriesArray1 = []; //array of x,y objects of line chart 1, to draw the table body 
  public seriesArray2 = []; //array of x,y objects of line chart 2, to draw the table body 
  public columnArray = [];  //array of x,y objects of column chart, to draw the table body 
  public areaArray = [];  //array of x,y objects of area chart, to draw the table body 

  public headers: any[]; //variable of the table header of line and area chart JSON data
  public columnChartHeaders: any[];  //variable of the table header of column chart JSON data

  constructor(private tableService: TableService) { }

  ngOnInit() {

    //service to get the JSON data of line chart 1
    this.tableService.getLineChart1().subscribe((data)=>{
      this.linechart1data = data;
      this.formDataForLinechart(this.linechart1data, this.seriesArray1);
      this.drawTable();
    });

    //service to get the JSON data of line chart 2
    this.tableService.getLineChart2().subscribe((data)=>{
      this.linechart2data = data;
      this.formDataForLinechart(this.linechart2data, this.seriesArray2);
      this.drawTable();
    });

    //service to get the JSON data of column chart
    this.tableService.getColumnChart().subscribe((data)=>{
      this.columnchartdata = data;
      this.formDataForColumnchart(this.columnchartdata,this.columnArray);
      this.drawColumnTable();
    });

    //service to get the JSON data of area chart
    this.tableService.getAreachart().subscribe((data)=>{
      this.areachartdata = data;
      this.formDataForLinechart(this.areachartdata,this.areaArray);
      this.drawTable();
    });

  }

  //function to create an array of objects, of line and area JSON, to draw the table body 
  formDataForLinechart(chartData,seriesArray){
    for(let i=0; i<chartData.data.xAxis.length;i++){
      let formObject = {};
      formObject['Date'] = moment(new Date(chartData.data.xAxis[i])).format('MM/DD/YYYY');
      formObject['Value'] = (chartData.data.yAxis.data[i]) ? chartData.data.yAxis.data[i] : '-';
      seriesArray.push(formObject);
    }
  }

 //function to create an array of objects, of column JSON, to draw the table body 
  formDataForColumnchart(chartData,seriesArray){
    for(let i=0; i<chartData.data.xAxis.length;i++){
      let formObject = {};
      formObject['Year'] = chartData.data.xAxis[i];
      formObject['Value'] = (chartData.data.yAxis.data[i]) ? chartData.data.yAxis.data[i] : '-';
      seriesArray.push(formObject);
    }
  }

  //function to create the headers of the line and area chart table
  drawTable(){
    this.headers = [
      { xaxis: 'Date', yaxis: 'Date' },
      { xaxis: 'Value', yaxis: 'Value' }
    ];
  }

  //function to create the headers of the column chart table
  drawColumnTable(){
    this.columnChartHeaders = [
      { xaxis: 'Year', yaxis: 'Year' },
      { xaxis: 'Value', yaxis: 'Value' }
    ];

  }

}
