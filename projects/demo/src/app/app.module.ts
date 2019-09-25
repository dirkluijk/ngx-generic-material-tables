import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material';
import { SortModule } from '@dirkluijk/ngx-generic-material-tables';

import { AppComponent } from './app.component';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { ReactiveTableComponent } from './reactive-table/reactive-table.component';

@NgModule({
  declarations: [
    AppComponent,
    GenericTableComponent,
    ReactiveTableComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatTableModule,
    SortModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
