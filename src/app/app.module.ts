import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';

// angular material
import {
  MatButtonModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // angular material
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    PopupComponent,
    // angular material
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  entryComponents: [PopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
