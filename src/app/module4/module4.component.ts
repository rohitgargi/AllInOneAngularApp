import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { forkJoin, map, switchMap, throwError } from 'rxjs';
import { sampleData } from '../shared/constants/constants';
import { FetchApiService } from '../shared/services/fetch-api.service';
import { UtilityService } from '../shared/services/utility.service';
import {TranslateService} from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-module4',
  templateUrl: './module4.component.html',
  styleUrls: ['./module4.component.scss']
})
export class Module4Component implements OnInit {

  products = sampleData.products;
  users = sampleData.users;
  selectedUser: any;
  selectedProduct:any;
  rewards: any;
  erroMessage: any;
  languageClass!: string;


  constructor(private location: Location,private title: Title,
    private meta: Meta, private utility: UtilityService, private fetchApi: FetchApiService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.utility.getSeoTagJson().subscribe(data => {
      this.title.setTitle(data.page4.title);
      this.meta.updateTag({ name: 'description', content: data.page4.description });
    });

    this.utility.languageSelection$.subscribe(val=>{
      if( this.location.path().includes('page4')){
        this.languageClass = val;
        this.translate.use(val);
      }
    });

    
  }

  //"https://swapi.dev/api/people/11/", "https://swapi.dev/api/people/35/"

  onUserChange(e:any){
    //console.log(this.userselect?.value)
    this.selectedUser = e.target.value
    console.log(this.selectedUser )
  }

  onProductChange(e:any){
    this.selectedProduct = e.target.value
    console.log(this.selectedProduct)
  }

  placeOrder(){
    this.erroMessage = null;
    const userObj = this.users.find(res=>res.userId === this.selectedUser);
    const locId = userObj?.locId ? userObj.locId : "loc1";
    const data = {
      productId: this.selectedProduct,
      userId: this.selectedUser,
      locId:locId
    }
    forkJoin({
      productDetail: this.fetchApi.getProductDetail(data.productId,data.userId),
      stockAvailability: this.fetchApi.getStockAvailabilityInLoc(data.productId,data.userId,data.locId)
    })
    .pipe(
      map(response=>{
        const productDetail = response.productDetail;
        const stockAvailability = response.stockAvailability;
        
        const result = [];
        if(productDetail && stockAvailability){
          result.push({
            productDetail,
            stockAvailability
          })
        }
        return result;
      }),
      switchMap(result=>{
        if(result.length){
          const userId = result[0].stockAvailability.userId
          return this.fetchApi.postPlaceOrder(userId)
        }else{
          //throw  Error('Some error occured while posting order!');
          return throwError(()=>new Error('"Some issue has occured while fetching rewards!"'));
        }
      }),

      switchMap(response=>{
        if(response.status === 200){
          return this.fetchApi.getRewardPoints(data.userId);
        }else{
          return throwError(()=>new Error("Some issue has occured while fetching rewards!"))
        }
      }),
    )
    .subscribe({
      next: (res) => this.rewards = res,
      error: (err) => {
        console.log(err);
        this.erroMessage = err?.message;
      }
    })
  }
}
