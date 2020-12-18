import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import { SetIndexComponent } from './set-index/set-index.component';
import {SettingRouterModule} from './setting-router.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { InformationComponent } from './information/information.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [SetIndexComponent, ChangePasswordComponent, InformationComponent],
  imports: [
    CommonModule,
    IonicModule,
    SettingRouterModule,
    RouterModule,
    FormsModule
  ]
})
export class SettingModule { }
