import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import {IonicModule} from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';
import {SlideVerifyComponent} from './slide-verify/slide-verify.component';
import { HeaderComponent } from './header/header.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NgxEchartsModule} from 'ngx-echarts';
import {MatDialogModule} from '@angular/material/dialog';
import {LoginInterceptor} from './http/handle/login.interceptor';

registerLocaleData(zh);

// 路由
const appRoute: Routes = [
  {path: 'login', component: LoginComponent, data: {animation: 'login'}},
  {path: 'home', // 主页路由
    loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule)
  },
  {path: 'setting', // 个人中心
    loadChildren: () => import('./setting/setting.module')
      .then(m => m.SettingModule)
  },
  {path: 'command', // 指挥调度
    loadChildren: () => import('./command/command.module')
      .then(m => m.CommandModule)
  },
  {path: 'queryAll', // 综合查询
    loadChildren: () => import('./Integratedquery/integrated-index.module')
      .then(m => m.IntegratedIndexModule)
  },
  { path: '',  redirectTo: '/login', pathMatch: 'full', data: {animation: 'login'} },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SlideVerifyComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdMobileModule,
    NgxEchartsModule,
    MatDialogModule,
    IonicModule,
    IonicModule.forRoot(),
    RouterModule,
    RouterModule.forRoot(appRoute),
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor , multi: true}
    ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
