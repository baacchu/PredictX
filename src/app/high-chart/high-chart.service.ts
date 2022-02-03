import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, throwError, of } from 'rxjs';
import { groupBy, orderBy, uniq, map } from "lodash";
import * as Highcharts from 'highcharts';
import { JsonDataService } from '../helpers/json-data.service';
import { ISeries } from '../home/models/i-series';


@Injectable({
  providedIn: 'root'
})
export class HighChartService implements OnDestroy {

  XAxisCategories: string[] = [];
  constructor(private jsonService: JsonDataService,
    private http: HttpClient) { }

  createChart(el:any, cfg:Highcharts.Options) {
    Highcharts.chart(el, cfg);
  }
  public getData(path: string): Observable<any[]> {
    return this.jsonService.getJsonData<any>(path);
  }

  getXAxisCategories(data: any[], category: string): string[] {
    this.XAxisCategories = uniq(map(data, category));
    return this.XAxisCategories;
  }

  getSeriesData(items: any[], legend: string[]): any[] {
    let seriesArray : any[] = [];
    for (var j = 0; j < legend.length; j++) {
      let series: any = {   
        name: legend[j],
        data: items.map(item => item[legend[j]])
      }
      seriesArray.push(series);
    }
    return seriesArray;
    
  }

  ngOnDestroy(): void {
    if (this.http) {
      this.http = null;
    }
    if (this.jsonService) {
      this.jsonService = null;
    }
  }
}
