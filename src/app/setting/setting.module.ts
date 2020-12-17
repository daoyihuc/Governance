import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { SetIndexComponent } from './set-index/set-index.component';
import {SettingRouterModule} from './setting-router.module';



@NgModule({
  declarations: [SetIndexComponent],
  imports: [
    CommonModule,
    IonicModule,
    SettingRouterModule,
    RouterModule
  ]
})
export class SettingModule { }
