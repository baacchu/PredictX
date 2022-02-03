import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { DashBoardItem } from '../../models/dash-board-item';
import { DataSource } from '../../models/data-source';
import { DashBoardService } from '../../services/dash-board.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-dashboard-item-action',
  templateUrl: './dashboard-item-action.component.html',
  styleUrls: ['./dashboard-item-action.component.scss']
})
export class DashboardItemActionComponent implements OnInit {

  _dashBoardItem!: DashBoardItem;
  @Input() set dashBoardItem(value: DashBoardItem) {
    this._dashBoardItem = value;
    this.populateActionForm();
  }

  @Output() dbItemActionEvent = new EventEmitter<DashBoardItem>();

  itemActionForm!: FormGroup;
  dataSources: DataSource[];
  chartTypes : string[];

  constructor(
    private fb: FormBuilder, 
    private homeService : HomeService,
    private dashBoardService: DashBoardService) { }

  ngOnInit(): void {
    this.getAllDataSources();
    this.setUpFormControl();
  }

  private getAllDataSources() {
    this.homeService.getDataSourceList()
        .subscribe(response => {
          if (response) {
           this.dataSources = response;
          }
        })
  }
  
  private setUpFormControl(): void {
    //Set up the form control
    this.itemActionForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      chartType: ['', Validators.required],
      dataSourceId: ['',Validators.required]
    });
  }

  private populateActionForm(): void {
    if(!this._dashBoardItem || this._dashBoardItem.id<1) return;
    this.f.patchValue({
      id: this._dashBoardItem.id,
      name: this._dashBoardItem.name,
      chartType: this._dashBoardItem.chartType,
      dataSourceId: this._dashBoardItem.dataSourceId,
    });
  }

  saveDashBoardItem() : void{
    if (this.validateForm()) {
      this.dashBoardService.saveDashboardItem(this.fc)
        .subscribe(response => {
          if (response) {
            this.dbItemActionEvent.emit(response);
          }
        })
    }
  }

  onDataSourceChange():void{
    let dsId= this.fc['dataSourceId'].value;
    let selectedDS = this.dataSources.filter(item => item.id===dsId)[0];
    this.chartTypes = selectedDS ? selectedDS.chartTypes:[];
  }

  onCancel(): void {
    this.dbItemActionEvent.emit(undefined);
  }

  private validateForm(): boolean {
    if (!this.f.valid) {
      Object.keys(this.fc).forEach(key => {
        this.fc[key].markAsDirty();
      });
    }
    return this.f.valid;
  }

  get f() { return this.itemActionForm; }
  get fc() { return this.itemActionForm.controls; }
}
