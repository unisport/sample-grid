import { Component, OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import {ProductInterface} from "../unisport-sample-interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { trigger,style,transition,animate,keyframes,query,stagger, state } from '@angular/animations';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  ,providers:[ApiService]
  ,animations: [

    trigger('products', [
      transition('* => *', [

        query(':self', style({ opacity: 0 }), {optional: true}),

        query(':self', stagger('500ms', [
          animate('.8s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])

  ]
})

export class HomeComponent implements OnInit {
  title = 'app';
  _productsArray:ProductInterface[];

    constructor(private apiSerivce:ApiService) {
    }
    //Get products
       getProducts(): void {
        this.apiSerivce.getProducts()
           .subscribe(
              resultArray => {this._productsArray = resultArray},
              error => console.log("Error :: " + error)
        )
      }
        ngOnInit(): void {
          this.getProducts();
     }

    //Convert text price to number
    //Replaces , by .
     convertJSONPriceToNumber(product:ProductInterface){
      return Number(product.price.replace(",","."));
     }

     //Differenses between prices in %
     getDiscount(product: ProductInterface){
       var old = Number(product.price_old.replace(",","."));
       var n = Number(product.price.replace(",","."));

       if(old == 0)
       {
         return 0;
       }
       
       return Math.round((old -n)/old*100);
     }

     //Does product  have discount
     hasDiscount(product: ProductInterface){
       return this.getDiscount(product) > 0
     }

     //Sorts the list of products based on lowest price first
     sortByprice(){
        return this._productsArray.sort((a:ProductInterface,b:ProductInterface) => 
        {
          if (this.convertJSONPriceToNumber(a) < this.convertJSONPriceToNumber(b)) {
            return -1;
          } else if (this.convertJSONPriceToNumber(a)>  this.convertJSONPriceToNumber(b)) {
            return 1;
          } else {
            return 0;
          }
        });
     } 

 }
