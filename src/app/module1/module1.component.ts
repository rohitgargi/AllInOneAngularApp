import { Component, OnInit } from '@angular/core';
import { ICategory } from '../shared/models/Icategory';
import { FetchApiService } from '../shared/services/fetch-api.service';

import { Meta, Title } from '@angular/platform-browser';
import { UtilityService } from '../shared/services/utility.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-module1',
  templateUrl: './module1.component.html',
  styleUrls: ['./module1.component.scss']
})
export class Module1Component implements OnInit {
  userForm: FormGroup;
  categories! : ICategory[];
  toggeleChecked!:Boolean

  constructor(private location: Location ,private http: FetchApiService,private title: Title,
    private meta: Meta, private utility: UtilityService, private _fb: FormBuilder, private translate: TranslateService) { 
      this.userForm = this._fb.group({
        name:['',Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z]+[ ]*)+$'), Validators.minLength(8)])],
        email:['',Validators.compose([Validators.required, Validators.email]) ],
        gitUrl:['',Validators.compose([Validators.required, Validators.pattern('(https?://)?(github.com)((/[a-zA-Z]+)?)((/[a-zA-Z]+)?)((/[a-zA-Z]+)?)')])],
        technologies: this._fb.array([
          this._fb.control('',Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z]+[ ]*)+$')]))
        ],Validators.required)
      })
    }

  ngOnInit(): void {
    
    this.utility.getSeoTagJson().subscribe(data => {
      this.title.setTitle(data.page1.title);
      this.meta.updateTag({ name: 'description', content: data.page1.description });
    });



 

    if( sessionStorage.getItem('page3Status') === '1'){
      this.toggeleChecked = true;
    }else{
      this.toggeleChecked = false;
    }

    // language selection observer    

    this.utility.languageSelection$.subscribe(val=>{

      if(this.location.path().includes('page1')){
        this.translate.use(val);
      }
    })

  }


  onToggleChange(event:any){
    if(event.target.checked){
      sessionStorage.setItem('page3Status','1');
      this.utility.toggleSwitch$.next(true);
    }else{
      sessionStorage.setItem('page3Status','0');
      this.utility.toggleSwitch$.next(false);
    }
  }
  get technologies() {
    return this.userForm.get('technologies') as FormArray;
  }

  addTechnologies(){
    this.technologies.push(this._fb.control('',Validators.required));
  }

  deleteTechnology(index:number){
    this.technologies.removeAt(index);

    // if(this.technologies.length>1){
    //   this.technologies.removeAt(index);
    // }else{
    //   alert('Form Should have atleast one technology');
    // }
    
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  onSubmit(){
    //this.submitted = true;
   if(this.userForm.valid){
    this.userForm.reset();
    alert("Pofile saved successfully!");
   }
  }

  getValidity(i:number) {
    if( (<FormArray>this.userForm.get('technologies')).controls[i].status ==='INVALID' && (<FormArray>this.userForm.get('technologies')).controls[i].dirty || (<FormArray>this.userForm.get('technologies')).controls[i].touched){
      return true;
    }

    return false;
  }

}
