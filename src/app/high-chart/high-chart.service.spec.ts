import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { HighChartService } from './high-chart.service';
import { JsonDataService } from '../helpers/json-data.service';

describe('HighChartService', () => {
  let service: HighChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
     providers: [HighChartService]
    });
    service = TestBed.inject(HighChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
