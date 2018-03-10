import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule, MatInputModule,MatNativeDateModule,MatButtonModule,MatDatepickerModule 
  ,MatSelectModule,MatDialogModule,MatTabsModule,MatCheckboxModule
  ,MatCardModule,MatTooltipModule,MatRadioModule,MatSnackBarModule,MatMenuModule,
  MatAutocompleteModule,MatToolbarModule,MatTableModule,MatPaginatorModule,MatExpansionModule}
   from '@angular/material';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,MatSidenavModule
    ,MatInputModule,MatNativeDateModule,MatButtonModule,MatDatepickerModule 
    ,MatSelectModule,MatDialogModule,MatTabsModule,MatCheckboxModule
    ,MatCardModule,MatTooltipModule,MatRadioModule,MatSnackBarModule,MatMenuModule,
    MatAutocompleteModule,MatToolbarModule,MatTableModule,MatPaginatorModule,
    MatExpansionModule,MatIconModule,
  ],
  exports: [MatSidenavModule
    ,MatInputModule,MatNativeDateModule,MatButtonModule,MatDatepickerModule 
    ,MatSelectModule,MatDialogModule,MatTabsModule,MatCheckboxModule
    ,MatCardModule,MatTooltipModule,MatRadioModule,MatSnackBarModule,MatMenuModule,
    MatAutocompleteModule,MatToolbarModule,MatTableModule,MatPaginatorModule,
    MatExpansionModule,MatIconModule,
  ],
  declarations: []
})
export class MaterialDesignModule { }
