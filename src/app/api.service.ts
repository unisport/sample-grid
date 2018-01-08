import { Injectable } from '@angular/core';
import { Http,Response, RequestOptions, Headers,RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {UnisportSampleInterface, ProductInterface} from "./unisport-sample-interface";


@Injectable()
export class ApiService {

  private _productsURLFromFile = "apiStub/apiSampleProducts.json";
//private _productsURL = "http://www.unisport.dk/api/sample/";
  constructor(private http:Http) 
  { }

  //Receives products from api
  //now it comes from the file
   getProducts(): Observable<ProductInterface[]>{
    return this.http
      .get(this._productsURLFromFile)
      .map((response:Response)=>{
        var sampleInterface = <UnisportSampleInterface>response.json();


        return <ProductInterface[]>sampleInterface.products;
      })
      .catch(this.handleError);
  }
  private handleError(error:Response){
    return Observable.throw(error.statusText);
  }

}
