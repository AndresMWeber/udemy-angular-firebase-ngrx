import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule
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
