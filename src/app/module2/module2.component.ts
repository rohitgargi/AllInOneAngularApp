import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { debounceTime, distinctUntilChanged, filter, fromEvent } from 'rxjs';
import { UtilityService } from '../shared/services/utility.service';
import {TranslateService} from '@ngx-translate/core';
import { Location } from '@angular/common';
import { TreeItem, TreeService } from './services/productTree.service';


@Component({
  selector: 'app-module2',
  templateUrl: './module2.component.html',
  styleUrls: ['./module2.component.scss']
})
export class Module2Component implements OnInit,AfterViewInit {

  currentItem!: TreeItem;
  showData: TreeItem[];
  selectedItems: any[] = [];

  @ViewChild('input') input!: ElementRef;

  constructor(private location: Location, private http:HttpClient, private title: Title,
    private meta: Meta, private utility: UtilityService, private treeService: TreeService, private translate: TranslateService) {
      // this.products = treeService.getProducts();
      this.showData = this.treeService.generateTestData();
     }

  ngOnInit(): void {
    this.utility.getSeoTagJson().subscribe(data => {
      this.title.setTitle(data.page2.title);
      this.meta.updateTag({ name: 'description', content: data.page2.description });
    });

    this.utility.languageSelection$.subscribe(val=>{
    
      if(this.location.path().includes('page2')){
        this.translate.use(val);
      }
    })
  } 

  findData(searchQuery:any){
    const copyData = this.showData;
    if(searchQuery && searchQuery.trim().length){
      const transformedValues = this.treeService.findAndSetData(copyData,searchQuery);
      this.showData = transformedValues;
    }else{
      this.showData = this.treeService.generateTestData();
    }
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
        .pipe(
            filter(Boolean), // This one to make sure we dont pass undefined value
            debounceTime(500),
            distinctUntilChanged()
        )
        .subscribe(()=>{

          console.log(this.input.nativeElement.value)
          this.findData(this.input.nativeElement.value);
        });
    }
}
