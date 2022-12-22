import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { debounceTime, from, map, mergeMap, Subscription, toArray } from 'rxjs';
import { FetchApiService } from '../shared/services/fetch-api.service';
import { UtilityService } from '../shared/services/utility.service';
import {TranslateService} from '@ngx-translate/core';

import { Location } from '@angular/common';

@Component({
  selector: 'app-module3',
  templateUrl: './module3.component.html',
  styleUrls: ['./module3.component.scss']
})
export class Module3Component implements OnInit,OnDestroy {
  starForm: FormGroup;
  //typeahead: FormControl = new FormControl();
  countries: string[] = [];
  suggestions: any = [];
  selectedStarShip:any = null;
  filmList: any[] | undefined;
  pilotList: any[] | undefined;
  obs:Subscription | undefined;
  erroMessage:any= {
    'suggestions':null,
    'films':null,
    'pilots':null
  };

  loading:any ={
    'suggestions':null,
    'films':null,
    'pilots':null
  }

  constructor(private location: Location, private title: Title,
    private meta: Meta, private utility: UtilityService, private fetchApi: FetchApiService, private translate: TranslateService) { 
      this.starForm = new FormGroup({
        typehead: new FormControl()
      });
    }

  ngOnInit(): void {
    this.utility.getSeoTagJson().subscribe(data => {
      this.title.setTitle(data.page3.title);
      this.meta.updateTag({ name: 'description', content: data.page3.description });
    });

    this.obs=this.starForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => this.suggest(data));

    this.utility.languageSelection$.subscribe(val=>{
      if( this.location.path().includes('page3')){
        this.translate.use(val);
      }
    });
  }

  suggest(data:any) {
    console.log(data.typehead)
    
    if(data.typehead?.length){
      this.loading.suggestions = true;
      this.fetchApi.getStarShips(data.typehead)
      .subscribe({
        next:(res)=>{
          console.log("suggestions",res);
            this.suggestions = res?.results.length ? res.results : [];
            this.loading.suggestions = false;
        },

        error: (err)=>{
            console.log(err);
            this.loading.suggestions  = false;
            this.erroMessage.suggestions =err?.message;
            console.log(this.erroMessage.suggestions)
        }
      })
    }else{
        this.filmList = undefined;
        this.pilotList = undefined;
        this.suggestions = [];
        this.selectedStarShip = null;
    }
   
  }

  selectedShip = (selectedItem:any) =>{
    this.selectedStarShip = selectedItem;
    this.suggestions = [];
    this.getFilmDetails(this.selectedStarShip.films);
    this.getPilotDetails(this.selectedStarShip.pilots);
  }



  getFilmDetails = (films:String[]) =>{
    this.loading.films  = true;
    if(films.length){
     // this.loading.films  = true;
     from(films).pipe(
        mergeMap(filmUrl =>
          this.fetchApi.findItemDetailByUrl(filmUrl).pipe(map(response => response)),
        ),
        toArray(),
      ).subscribe({
        next:(finalResult)=>{
          this.filmList = finalResult;
          this.loading.films  = false;
        },
        error: (err)=>{
          console.log(err);
          this.loading.films  = false;
          this.erroMessage.films =err?.message;
          console.log(this.erroMessage.films)
        }

      })
    }else{
      this.loading.films  = false;
    }
  }

  getPilotDetails = (pilots:String[]) =>{
    this.loading.pilots  = true;
    if(pilots.length){
     
     from(pilots).pipe(
        mergeMap(filmUrl =>
          this.fetchApi.findItemDetailByUrl(filmUrl).pipe(map(response => response)),
        ),
        toArray(),
      ).subscribe({
        next:(finalResult)=>{
          this.pilotList = finalResult;
          this.loading.pilots  = false;
        },
        error: (err)=>{
          console.log(err);
          this.loading.pilots  = false;
          this.erroMessage.pilots =err?.message;
          console.log(this.erroMessage.pilots)
        }
      })
    }else{
      this.loading.pilots  = false;
    }
  }
  ngOnDestroy() {
    this.obs?.unsubscribe();
  }
}
