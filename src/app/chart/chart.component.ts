import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ChartService } from './chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {

  public linechart1;  //reference of line chart 1 which hold chart configurations
  public linechart2;  //reference of line chart 2 which hold chart configurations
  public columnchart; //reference of column chart which hold chart configurations
  public areachart; //reference of area chart which hold chart configurations

  public linechart1data;  //which holds the data of line chart 1 from the JSON
  public linechart2data;  //which holds the data of line chart 2 from the JSON
  public columnchartdata;  //which holds the data of column chart from the JSON
  public areachartdata;  //which holds the data of area chart from the JSON

  public seriesArray1 = []; //array of data, of line chart 1, to pass to the 'series' param of the highchart option
  public seriesArray2 = []; //array of data, of line chart 2, to pass to the 'series' param of the highchart option
  public columnArray = [];  //array of data, of column chart, to pass to the 'series' param of the highchart option
  public areaArray = [];  //array of data, of area chart, to pass to the 'series' param of the highchart option

  constructor(private chartService: ChartService) { }

  ngOnInit() {

    //service to get the JSON data of line chart 1
    this.chartService.getLineChart1().subscribe((data)=>{
      this.linechart1data = data;
      this.formSeriesData(this.linechart1data,this.seriesArray1);
      this.drawLineChart1();
    });
    
    //service to get the JSON data of line chart 2
    this.chartService.getLineChart2().subscribe((data)=>{
      this.linechart2data = data;
      this.formSeriesData(this.linechart2data,this.seriesArray2);
      this.drawLineChart2();
    });

    //service to get the JSON data of column chart
    this.chartService.getColumnChart().subscribe((data)=>{
      this.columnchartdata = data;
      this.formSeriesData(this.columnchartdata,this.columnArray);
      this.drawColumnchart();
    });

    //service to get the JSON data of area chart
    this.chartService.getAreachart().subscribe((data)=>{
      this.areachartdata = data;
      this.formSeriesData(this.areachartdata,this.areaArray);
      this.drawAreachart();
    });
  }

  //function to create an array of data, to pass, to the 'series' param of the highchart
  formSeriesData(chartData,seriesArray){
    for(let i=0; i<chartData.data.xAxis.length;i++){
      let formSeriesArray = [];
      formSeriesArray.push(chartData.data.xAxis[i]);
      formSeriesArray.push(chartData.data.yAxis.data[i]);
      seriesArray.push(formSeriesArray);
    }
  }
  
  //highchart configurations to draw line chart 1
  drawLineChart1(){
    this.linechart1 = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: this.linechart1data.config.title
      },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: this.linechart1data.config.axis.xaxis.label
      },
        type: 'datetime',
        dateTimeLabelFormats: {
            day: this.linechart1data.config.axis.xaxis.labelFormat
        }
    },
      yAxis: {
        title: {
          text: this.linechart1data.data.yAxis.name
      }
    },
      series: [{
        name: 'series 1',
        data: this.seriesArray1
      }],
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                chart: {
                    height: 300
                }              
            }
        }]
    }

    });
  }

  //highchart configurations to draw line chart 2
  drawLineChart2(){
    this.linechart2 = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: this.linechart2data.config.title
      },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: this.linechart2data.config.axis.xaxis.label
      },
        type: 'datetime',
        dateTimeLabelFormats: {
            day: this.linechart2data.config.axis.xaxis.labelFormat
        }
    },
      yAxis: {
        title: {
          text: this.linechart2data.data.yAxis.name
      }
    },
      series: [{
        name: 'series 2',
        data: this.seriesArray2
      }],
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                chart: {
                    height: 300
                }              
            }
        }]
    }
    });
  }

  //highchart configurations to draw column chart
  drawColumnchart(){
    this.columnchart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: this.columnchartdata.config.title
      },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: this.columnchartdata.config.axis.xaxis.label
      },
      categories: this.columnchartdata.data.xAxis
    },
      yAxis: {
        title: {
          text: this.columnchartdata.data.yAxis.name
      }
    },
      series: [{
        name: 'series 3',
        data: this.columnArray
      }],
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                chart: {
                    height: 300
                }              
            }
        }]
    }
    });
  }

  //highchart configurations to draw area chart
  drawAreachart(){
    this.areachart = new Chart({
      chart: {
        type: 'area'
      },
      title: {
        text: this.areachartdata.config.title
      },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: this.areachartdata.config.axis.xaxis.label
      },
        type: 'datetime',
        dateTimeLabelFormats: {
            day: this.areachartdata.config.axis.xaxis.labelFormat
        }
    },
      yAxis: {
        title: {
          text: this.areachartdata.data.yAxis.name
      }
    },
      series: [{
        name: 'series 4',
        data: this.areaArray
      }],
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                chart: {
                    height: 300
                }              
            }
        }]
    }
    });
  }
}
