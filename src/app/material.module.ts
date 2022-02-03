import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule
  ]

})
export class MaterialModule { }
