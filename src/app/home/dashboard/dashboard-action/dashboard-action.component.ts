import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { DashBoard } from '../../models/dash-board';
import { DashBoardService } from '../../services/dash-board.service';

@Component({
  selector: 'app-dashboard-action',
  templateUrl: './dashboard-action.component.html',
  styleUrls: ['./dashboard-action.component.scss']
})
export class DashboardActionComponent implements OnInit {

  _dashBoard!: DashBoard;
  @Input() set dashBoard(value: DashBoard) {
    this._dashBoard = value;
    this.populateActionForm();
  }

  @Output() dbActionEvent = new EventEmitter<DashBoard>();
  
  dashBoardActionForm!: FormGroup;
  constructor(private fb: FormBuilder, private dashBoardService: DashBoardService) { }

  ngOnInit(): void {
    this.setUpFormControl();
  }

  private setUpFormControl(): void {
    //Set up the form control
    this.dashBoardActionForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      createdBy: ['', Validators.required],
      createdDate: ['']
    });
  }

  private populateActionForm(): void {
    if(!this._dashBoard || this._dashBoard.id<1) return;
    this.f.patchValue({
      id: this._dashBoard.id,
      name: this._dashBoard.name,
      description: this._dashBoard.description,
      createdBy: this._dashBoard.createdBy,
      createdDate: this._dashBoard.createdDate
    });
  }

  saveDashBoard() : void{
    if (this.validateForm()) {
      this.dashBoardService.saveDashboard(this.fc)
        .subscribe(response => {
          if (response) {
            this.dbActionEvent.emit(response);
          }
        })
    }
  }

  onCancel(): void {
    this.dbActionEvent.emit(undefined);
  }

  private validateForm(): boolean {
    if (!this.f.valid) {
      Object.keys(this.fc).forEach(key => {
        this.fc[key].markAsDirty();
      });
    }
    return this.f.valid;
  }

  get f() { return this.dashBoardActionForm; }
  get fc() { return this.dashBoardActionForm.controls; }
}
