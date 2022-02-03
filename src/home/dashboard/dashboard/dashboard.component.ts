import { Component, Input, OnInit } from '@angular/core';

import { DashBoard } from '../../models/dash-board';
import { DashboardItemComponent } from '../dashboard-item/dashboard-item.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private _dashBoard: DashBoard = new DashBoard;
  @Input() set dashBoard(value: DashBoard) {
    this._dashBoard = value;
  }  
  get dashBoard(): DashBoard {
    return this._dashBoard;
  }
  constructor() { }
  ngOnInit(): void {
  }
  
}
