import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {RouterModule} from '@angular/router';
import {HomeRouterModule} from './home-router.module';
import { HomeHeaderComponent } from './home-header/home-header.component';
import {IonicModule} from '@ionic/angular';



@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    HomeRouterModule,
    IonicModule,
    // 主页路由
  ],
  declarations: [
    IndexComponent,
    HomeHeaderComponent, // 主页
  ],
})
export class HomeModule { }
