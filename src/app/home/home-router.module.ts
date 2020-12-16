import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const homeRouter: Routes =[
  {
    path: '', // 路径名称
    // component: '',  // 组件 <---
    children: [
      {
        // path: 'login',
        // component: LoginComponent, // <---
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' },
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
