import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DashboardItemActionComponent } from './dashboard-item-action.component';

import { JsonDataService } from 'src/app/helpers/json-data.service';
import { DashBoardService } from '../../services/dash-board.service';
import { HomeService } from '../../services/home.service';

describe('DashboardItemActionComponent', () => {
  let component: DashboardItemActionComponent;
  let fixture: ComponentFixture<DashboardItemActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ DashboardItemActionComponent ],
      providers: [
        JsonDataService,DashBoardService,HomeService,FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardItemActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
