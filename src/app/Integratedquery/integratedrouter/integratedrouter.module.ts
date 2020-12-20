import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
import {IndexComponent} from "../index/index.component";


const Router: Routes = [
  {
    path: '', // 路径名称
    component: IndexComponent,  // 组件 <---
    children: [
      {
        path: 'index', // 综合查询
        component: IndexComponent, // <---
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class IntegratedrouterModule { }
