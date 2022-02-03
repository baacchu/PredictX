import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, throwError, of } from 'rxjs';
import { map, catchError,tap } from 'rxjs/operators';

import { JsonDataService } from '../../helpers/json-data.service';
import { DashBoard } from '../models/dash-board';
import { DataSource } from '../models/data-source';
import { DashBoardItem } from '../models/dash-board-item';


@Injectable({
  providedIn: 'root'
})



export class HomeService  implements OnDestroy  {

 
  constructor(private jsonService: JsonDataService,
    private http: HttpClient) { }

  
  private jsonDashboardApi = 'api/dashBoard';
  private jsonDashboardItemApi = 'api/dashBoardItem';
  private jsonDataSourceApi = 'api/dataSource';

  public getDashboardList(): Observable<DashBoard[]> {
    return this.http.get<DashBoard[]>(this.jsonDashboardApi)
    .pipe(
      map(data =>data),
      catchError(this.handleError<any>('getDashboardList'))
    );
  }

  public getDataSourceList(): Observable<DataSource[]> {
    return this.http.get<DataSource[]>(this.jsonDataSourceApi)
    .pipe(
      map(data =>data),
      catchError(this.handleError<any>('getDataSourceList'))
    );
  }

  public getDashBoardItemList(): Observable<DashBoardItem[]> {
    return this.http.get<DashBoardItem[]>(this.jsonDashboardItemApi)
    .pipe(
      map(data =>data),
      catchError(this.handleError<any>('getDashBoardItemList'))
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
  }


}
