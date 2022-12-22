import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FetchApiService {

  constructor(private http: HttpClient) { }


  getStarShips(query:string):Observable<any>{
    return this.http.get('https://swapi.dev/api/starships?search='+query)
  }

  findItemDetailByUrl (url: any):Observable<any>{
    return this.http.get(url);
  }

  getProductDetail(userId:string,productId:string):Observable<any>{
    return this.http.get(`http://localhost:3000/get/products/${productId}/${userId}`);
  }

  getStockAvailabilityInLoc(userId:string,productId:string,locId:string):Observable<any>{
    return this.http.get(`http://localhost:3000/get/stocks/${productId}/${userId}/${locId}`);
  }

  postPlaceOrder(userId:string):Observable<any>{
    return this.http.post(`http://localhost:3000/postPlaceOrder`,{userId});
  }

  getRewardPoints(userId:string):Observable<any>{
    return this.http.get(`http://localhost:3000/get/rewards/${userId}`);
  }
  
  

}
