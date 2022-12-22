import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Module4Component } from './module4.component';

const routes: Routes = [{ path: '', component: Module4Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Module4RoutingModule { }
