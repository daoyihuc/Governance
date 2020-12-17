import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';

const homeRouter: Routes = [
  {
    path: '', // 路径名称
    component: IndexComponent,  // 组件 <---
    children: [
      {
        path: 'home',
        component: IndexComponent, // <---
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home' },
    ],
  }
];

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(homeRouter)
  ],
 declarations: [

 ],
  exports: [RouterModule]
})
export class HomeRouterModule { }
