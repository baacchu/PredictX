import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';

import { HighChartComponent } from '../../../high-chart/high-chart.component';

import { DataSource } from '../../models/data-source';
import { DashBoardService } from '../../services/dash-board.service';
import { HighChartService } from '../../../high-chart/high-chart.service';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent extends HighChartComponent {

  private _dashBoardItemId: number = 0;
  private dataSource : DataSource = new DataSource;
  
  @Input() set dashBoardtemId(value: number) {
    this._dashBoardItemId = value;
    this.getDashBoardDetails();
  }
  get dashBoardtemId(): number {
    return this._dashBoardItemId;
  }
  
  constructor( hcService: HighChartService,private dashBoardService: DashBoardService) {
    super(hcService);
   }

  private getDashBoardDetails(): void {
    this.dashBoardService.getDashBoardItemListById(this._dashBoardItemId)
      .subscribe(response => {
        if(response){
          this.chartDetails = response;
          this.dashBoardService.getItemDataSource(response.dataSourceId)
            .subscribe(response=>{
              this.dataSource =response;
              this.getChart(this.dataSource);
            })
        }
      })
  }

  
}
