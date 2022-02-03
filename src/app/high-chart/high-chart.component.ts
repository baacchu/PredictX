import {  Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { DataSource } from '../home/models/data-source';
import * as Highcharts from 'highcharts';
import { HighChartService } from './high-chart.service';
import { DashBoardItem } from '../home/models/dash-board-item';


@Component({
  selector: 'app-high-chart',
  templateUrl: './high-chart.component.html',
  styleUrls: ['./high-chart.component.scss']
})
export class HighChartComponent implements OnInit {

  @ViewChild('charts')
  public chartEl!: ElementRef;
  constructor(private hcService: HighChartService) { }
  private _chartData: any;
  private _config : DataSource =new DataSource;
  public chartDetails : DashBoardItem = new DashBoardItem;

  ngOnInit(){
    
  }
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions : Highcharts.Options = {};
 
  getChart(cf: DataSource): void {
    this._config = cf;
    this.getChartData();
  }


  private getChartData(): void {
    this.hcService.getData(this._config.path)
      .subscribe(data => { this._chartData = data; this.configureChart();})
  }

  private configureChart(): void {
    console.log(this.chartDetails.chartType);
    let opt : Highcharts.Options  = { 
      title: {
        text: this._config.name
    },
    chart: {
      type: this.chartDetails.chartType
    },
    subtitle: {
        text: this._config.name
    },
    xAxis: {
        categories:  this.hcService.getXAxisCategories(this._chartData, this._config.xAxis)
    },
    series: this.hcService.getSeriesData(this._chartData, this._config.legend)
    }
    this.chartOptions = Object.assign({},opt);
    this.hcService.createChart(this.chartEl.nativeElement, this.chartOptions);
  }

}
