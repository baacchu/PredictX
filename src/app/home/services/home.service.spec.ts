import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { JsonDataService }  from '../../helpers/json-data.service';

describe('HomeService', () => {
  let service: HomeService;
  let jsonService : JsonDataService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
     providers: [HomeService,JsonDataService]
    });
    service = TestBed.inject(HomeService);
    jsonService  = TestBed.inject(JsonDataService);

  });

  it('home service should be created', () => {
    expect(service).toBeTruthy();
  });
  it('json service should be created', () => {
    expect(jsonService).toBeTruthy();
  });
});
