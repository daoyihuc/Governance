import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {RouterModule} from '@angular/router';
import {HomeRouterModule} from './home-router.module';



@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    HomeRouterModule, // 主页路由
  ],
  declarations: [
    IndexComponent, // 主页
  ],
})
export class HomeModule { }
