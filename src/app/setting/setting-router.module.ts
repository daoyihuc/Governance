import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SetIndexComponent} from './set-index/set-index.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {InformationComponent} from './information/information.component';

const settingRouter: Routes = [
  {
    path: '', // 路径名称
    component: SetIndexComponent,  // 组件 <---
    children: [
      {
        path: 'setIndex',
        component: SetIndexComponent,  // 组件 <---
      },
    ],
  },
  { path: 'changepassword',
    component: ChangePasswordComponent,
    data: {animation: 'login'}
  },
  { path: 'information',
    component: InformationComponent,
    data: {animation: 'login'}
  },
  { path: '', redirectTo: 'setIndex', pathMatch: 'full' },
  { path: '**', redirectTo: 'setIndex' },
];

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(settingRouter)
  ],
  declarations: [

  ],
  exports: [RouterModule]
})
export class SettingRouterModule { }
