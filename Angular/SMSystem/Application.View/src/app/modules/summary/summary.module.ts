import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { ReportsComponent } from './components/reports/reports.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { MaterialDesignModule } from '../material-design/material-design.module';

@NgModule({
  imports: [
    CommonModule,
    SummaryRoutingModule,FormsModule,ReactiveFormsModule,ComboBoxModule,GridModule,MaterialDesignModule
  ],
  declarations: [ReportsComponent]
})
export class SummaryModule { }
