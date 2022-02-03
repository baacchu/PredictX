import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { DashboardActionComponent } from '../dashboard/dashboard-action/dashboard-action.component'
import { DashBoard } from '../models/dash-board';
import { HomeService } from '../services/home.service';
import { DashBoardItem } from '../models/dash-board-item';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  title = 'PredictX';
  dashboards: DashBoard[] = [];
  selectedDashboard: DashBoard = new DashBoard;
  actionItem : DashBoard;
  isActiveDashBoard : boolean =false;
  isActiveDashBoardItem : boolean =false;
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.populateDashboardList();
  }

  private populateDashboardList() {
    this.homeService.getDashboardList().subscribe(response => {
      if (response) {
        this.dashboards = response;
        if (this.dashboards && this.dashboards.length > 0) {
          this.selectedDashboard = this.dashboards[0];
        }
      }
      this.dashboards = response;
      console.log("populateDashboardList", this.dashboards);
    })
  }

  displayDashboard(dashboard: DashBoard): void {
    this.selectedDashboard = dashboard;
    console.log(this.selectedDashboard);
  }

  addNewDashBoard(): void {
    this.actionItem = new DashBoard();
    this.isActiveDashBoard = true;
  }

  editSelectedDashBoard(): void {
    this.actionItem = Object.assign({},this.selectedDashboard);
    this.isActiveDashBoard = true;
  }

  onDbActionEvent(dashBoard: DashBoard): void {
    if(dashBoard){
      this.selectedDashboard = dashBoard;
      this.dashboards.push(this.selectedDashboard);
    }
    this.isActiveDashBoard = false;
  }

  onDbItemActionEvent(dashBoardItem: DashBoardItem): void {
    if(dashBoardItem){
      this.selectedDashboard.dashBoardItemIds.push(dashBoardItem.id);
    }
    this.isActiveDashBoardItem = false;
  }

  addNewDashBoardItem(): void {
    let actionItem = new DashBoardItem();
    this.isActiveDashBoardItem = true;
  }
}
