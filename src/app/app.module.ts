import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {  MatButtonModule,
          MatMenuModule,
          MatToolbarModule,
          MatIconModule,
          MatCardModule,
          MatGridListModule } from '@angular/material';
import { AppComponent } from './app.component';
import 'hammerjs';
import { HomeComponent } from './home/home.component';
import {FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
