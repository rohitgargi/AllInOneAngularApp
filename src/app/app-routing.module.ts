import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageGuard } from './guard/pageGuard.guard';

const routes: Routes = [
  { path: 'page1', loadChildren: () => import('./module1/module1.module').then(m => m.Module1Module) },
  { path: 'page2', loadChildren: () => import('./module2/module2.module').then(m => m.Module2Module) },
  { path: 'page3', canActivate:[PageGuard], loadChildren: () => import('./module3/module3.module').then(m => m.Module3Module) },
  { path: 'page4', loadChildren: () => import('./module4/module4.module').then(m => m.Module4Module) },
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'page1',
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
