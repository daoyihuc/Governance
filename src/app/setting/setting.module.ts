import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { SetIndexComponent } from './set-index/set-index.component';
import {SettingRouterModule} from './setting-router.module';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [SetIndexComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    IonicModule,
    SettingRouterModule,
    RouterModule
  ]
})
export class SettingModule { }
