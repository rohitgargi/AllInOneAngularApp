import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Module3Component } from './module3.component';

const routes: Routes = [{ path: '', component: Module3Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Module3RoutingModule { }
