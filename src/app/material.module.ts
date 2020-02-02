import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule
];

@NgModule({
  imports: [
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    ...materialModules,
  ],
  exports: materialModules
})
export class MaterialModule {}
