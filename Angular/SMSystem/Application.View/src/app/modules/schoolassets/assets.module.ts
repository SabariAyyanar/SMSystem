import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';

import { AssetsRoutingModule } from './assets-routing.module';
import { LibraryComponent } from './components/library/library.component';
import { HostelComponent } from './components/hostel/hostel.component';
import { ComboBoxModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { TransportComponent } from './components/transport/transport.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { AddhostelComponent } from './components/hostel/components/addhostel/addhostel.component';
import { EdithostelComponent } from './components/hostel/components/edithostel/edithostel.component';
import { BookComponent } from './components/library/components/book/book.component';
import { BookcategoryComponent } from './components/library/components/bookcategory/bookcategory.component';
import { ClassbookComponent } from './components/library/components/classbook/classbook.component';
import { LendbookComponent } from './components/library/components/lendbook/lendbook.component';

@NgModule({
  imports: [
    CommonModule,
    AssetsRoutingModule,GridModule,ComboBoxModule,FormsModule,ReactiveFormsModule,MaterialDesignModule
  ],
  declarations: [LibraryComponent, HostelComponent, TransportComponent,
        AddhostelComponent,EdithostelComponent,BookComponent,BookcategoryComponent
        ,ClassbookComponent,LendbookComponent]
})
export class AssetsModule { }
