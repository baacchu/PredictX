import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { DashboardActionComponent } from './dashboard-action.component';

import { DashBoard } from '../../models/dash-board';
import { DashBoardService } from '../../services/dash-board.service';

describe('DashboardActionComponent', () => {
  let service: DashBoardService;
  let component: DashboardActionComponent;
  let fixture: ComponentFixture<DashboardActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ DashboardActionComponent ],
      providers: [
        DashBoardService,
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
