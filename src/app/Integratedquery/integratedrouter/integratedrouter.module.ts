import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from '../index/index.component';
import {QueryIndexComponent} from '../query-index/query-index.component';
import {QueryOperationComponent} from '../query-operation/query-operation.component';
import {QueryenterpriseComponent} from '../queryenterprise/queryenterprise.component';
import {QueryVehicleComponent} from '../query-vehicle/query-vehicle.component';


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
  {
    path: 'queryIndex',
    component: QueryIndexComponent,
    children: [
      {
        path: 'operation',
        component: QueryOperationComponent,
      },
      {
        path: 'enterprise',
        component: QueryenterpriseComponent,
      },
      {
        path: 'vehicle',
        component: QueryVehicleComponent,
      },
      { path: '', redirectTo: 'operation', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: '**', redirectTo: 'index' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(Router)
  ],
  exports: [RouterModule]
})
export class IntegratedrouterModule { }
