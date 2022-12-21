import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Module2Component } from './module2.component';

const routes: Routes = [{ path: '', component: Module2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Module2RoutingModule { }
