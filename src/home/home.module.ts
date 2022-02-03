import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HighchartsChartModule } from 'highcharts-angular';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DashboardItemComponent } from './dashboard/dashboard-item/dashboard-item.component';
import { HighChartComponent } from '../high-chart/high-chart.component';
import { DashboardActionComponent } from './dashboard/dashboard-action/dashboard-action.component';
import { DashboardItemActionComponent } from './dashboard/dashboard-item-action/dashboard-item-action.component';



@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    DashboardItemComponent,
    HighChartComponent,
    DashboardActionComponent,
    DashboardItemActionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, FormsModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    HighchartsChartModule
  ]
})
export class HomeModule { }
