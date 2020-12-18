import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import {IonicModule} from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';
import {SlideVerifyComponent} from './slide-verify/slide-verify.component';

// 路由
const appRoute: Routes = [
  {path: 'login', component: LoginComponent, data: {animation: 'login'}},
  {path: 'home', // 主页路由
    loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule)
  },
  {path: 'setting', // 主页路由
    loadChildren: () => import('./setting/setting.module')
      .then(m => m.SettingModule)
  },
  {path: 'command', // 主页路由
    loadChildren: () => import('./command/command.module')
      .then(m => m.CommandModule)
  },
  { path: '',  redirectTo: '/login', pathMatch: 'full', data: {animation: 'login'} },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SlideVerifyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdMobileModule,
    IonicModule,
    IonicModule.forRoot(),
    RouterModule,
    RouterModule.forRoot(appRoute),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
