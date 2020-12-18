import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {InformationComponent} from './information/information.component';

const homeRouter: Routes = [
  {
    path: '', // 路径名称
    component: IndexComponent,  // 组件 <---
    children: [
      {
        path: 'home',
        component: IndexComponent, // <---
      },
    ],
  },
  { path: 'entry', // 录入信息
    component: InformationComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
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
