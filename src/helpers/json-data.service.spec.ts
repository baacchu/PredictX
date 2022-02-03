import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { JsonDataService } from './json-data.service';

describe('JsonDataService', () => {
  let service: JsonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
     providers: [JsonDataService]
    });
    service  = TestBed.inject(JsonDataService);
  });
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
