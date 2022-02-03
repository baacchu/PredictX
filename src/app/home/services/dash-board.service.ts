import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, concatMap, filter, tap, mergeMap } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { DashBoardItem } from '../models/dash-board-item';
import { DataSource } from '../models/data-source';
import { HomeService } from './home.service'
import { DashBoard } from '../models/dash-board';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService   implements OnDestroy  {

  private jsonDashboardApi = 'api/dashBoard';
  private jsonDashboardItemApi = 'api/dashBoardItem';
  private jsonDataSourceApi = 'api/dataSource';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient,
    private homeService: HomeService) { }


  saveDashboard(frmGroup: any): Observable<any> {
    let dashboard = this.getDashboard(frmGroup);
    if (dashboard.id && dashboard.id > 0) {
      return this.updateDashboard(dashboard);
    } else {
      return this.createDashBoard(dashboard);
    }
  }

  private createDashBoard(dashboard: DashBoard): Observable<DashBoard> {
    return this.http.post<DashBoard>(this.jsonDashboardApi, dashboard, this.httpOptions).pipe(
      map(response => response),
      catchError(this.handleError<any>('createDashBoard')))
  }

  private updateDashboard(dashboard: DashBoard): Observable<any> {
    const dashboardUrl = `${this.jsonDashboardApi}/${dashboard.id}`;
    return this.http.put(dashboardUrl, dashboard);
  }

  deleteDashBoard(dashboard: DashBoard): Observable<any> {
    const dashboardUrl = `${this.jsonDashboardApi}/${dashboard.id}`;
    return this.http.delete(dashboardUrl);
  }

  private getDashboard(frmGroup: any): DashBoard {
    let action = new DashBoard();
    action.id = frmGroup['id'].value ? frmGroup['id'].value : null;
    action.name = frmGroup['name'].value;
    action.description = frmGroup['description'].value;
    action.createdBy = frmGroup['createdBy'].value;
    action.createdDate = frmGroup['createdDate'].value;
    return action;
  }

  saveDashboardItem(frmGroup: any): Observable<any> {
    let dashboardItem = this.getDashboardItem(frmGroup);
    if (dashboardItem.id && dashboardItem.id > 0) {
      return this.updateDashboardItem(dashboardItem);
    } else {
      return this.createDashBoardItem(dashboardItem);
    }
  }

  private createDashBoardItem(dashboardItem: DashBoardItem): Observable<DashBoard> {
    return this.http.post<DashBoardItem>(this.jsonDashboardItemApi, dashboardItem, this.httpOptions).pipe(
      map(response => response),
      catchError(this.handleError<any>('createDashBoardItem')))
  }

  private updateDashboardItem(dashboardItem: DashBoardItem): Observable<any> {
    const dashboardUrl = `${this.jsonDashboardItemApi}/${dashboardItem.id}`;
    return this.http.put(dashboardUrl, dashboardItem);
  }

  deleteDashBoardItem(dashboardItem: DashBoardItem): Observable<any> {
    const dashboardUrl = `${this.jsonDashboardItemApi}/${dashboardItem.id}`;
    return this.http.delete(dashboardUrl);
  }

  private getDashboardItem(frmGroup: any): DashBoardItem {
    let action = new DashBoardItem();
    action.id = frmGroup['id'].value ? frmGroup['id'].value : null;
    action.name = frmGroup['name'].value;
    action.chartType = frmGroup['chartType'].value;
    action.dataSourceId = frmGroup['dataSourceId'].value;
    return action;
  }

  public getDashBoardItemListById(id: number): Observable<any> {
    return this.homeService
      .getDashBoardItemList()
      .pipe(
        map((response: DashBoardItem[]) => response.filter(item => item.id === id)[0]),
        concatMap((res: DashBoardItem) => {
          return this.homeService.getDataSourceList().pipe(
            map(response => response.filter(item => item.id === res.dataSourceId)[0]),
            map((response) => {
              return {
                ...res,
                dataSource: response
              }
            })
          )
        }),
        catchError(this.handleError<any>('getDashBoardItemListById'))
      );
  }

  public getItemDataSource(id: number): Observable<DataSource> {
    return this.homeService
      .getDataSourceList()
      .pipe(map(response =>
        response.filter(item => item.id === id)[0]
      ),
        catchError(this.handleError<any>('getDashBoardItemListById'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  ngOnDestroy(): void {
    if (this.http) {
      this.http = null;
    }
    if (this.homeService) {
      this.homeService = null;
    }
  }
}
