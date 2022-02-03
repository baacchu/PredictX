import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JsonDataService implements OnDestroy {

  private jsonDataRoot = './assets/json/';

  constructor(private http: HttpClient) { }

  public getJsonData<Type>(fileName: string): Observable<Type[]> {
    let fullPath = this.jsonDataRoot + fileName;
    return this.http
      .get<Type>(fullPath)
      .pipe(map(response => response),
        catchError(this.handleError<any>('getJsonData'))
      )

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
