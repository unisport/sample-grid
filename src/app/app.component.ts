import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import {ProductInterface} from "./unisport-sample-interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  ,providers:[ApiService]
})
 export class AppComponent {
   title = 'app';
     constructor() {

     }  
}
