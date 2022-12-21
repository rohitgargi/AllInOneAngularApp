import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/shared/services/utility.service';
import {TranslateService} from '@ngx-translate/core';
import { filter, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  enablePage3!: boolean;

  constructor(private utility: UtilityService, private translate: TranslateService) { }


  languages = [
    {
      title:'English',
      key:'en',
      id:1
    },
    {
      title:'Spanish',
      key:'sp',
      id:2
    }, 
    {
      title:'French',
      key:'fr',
      id:3
    }
  ]
  ngOnInit(): void {
    
    this.utility.toggleSwitch$.subscribe(val=>{
      console.log("TOGGLE SWITCH",val);
      if(val){
        this.enablePage3 = true;
      }else{
        this.enablePage3 = false;
      }
    });

    // fromEvent<StorageEvent>(window, "storage").pipe(
    //   filter(event => event.storageArea === sessionStorage),
    //   filter(event => event.key === "page3Status"),
    //   map(event => event.newValue)
    // ).subscribe(val=>{
    //   console.log("session subscriber", val);
    // })
  }

  skiptomain = () =>{
    this.utility.initiateSkipToMain();
  }
  onLanguageChange(event: any){
    // console.log(event.target.value)
    // this.translate.use(event.target.value);

    this.utility.languageSelection$.next(event.target.value);
  }

  
}
