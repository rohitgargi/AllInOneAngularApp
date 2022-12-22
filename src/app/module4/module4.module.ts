import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module4RoutingModule } from './module4-routing.module';
import { Module4Component } from './module4.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/page4/', '.json');
}

@NgModule({
  declarations: [
    Module4Component
  ],
  imports: [
    CommonModule,
    Module4RoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
    },
    isolate:true
    })
    
  ]
})
export class Module4Module { }
