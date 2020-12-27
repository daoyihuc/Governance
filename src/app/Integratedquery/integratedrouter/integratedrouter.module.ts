import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from '../index/index.component';
import {QueryIndexComponent} from '../query-index/query-index.component';
import {QueryenterpriseComponent} from '../queryenterprise/queryenterprise.component';
import {QueryVehicleComponent} from '../query-vehicle/query-vehicle.component';
import {QueryOperationsComponent} from '../query-operations/query-operations.component';
import {QueryPassingCarComponent} from '../query-passing-car/query-passing-car.component';
import {QueryIllegalRecordComponent} from "../query-illegal-record/query-illegal-record.component";


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
    path: 'queryIndex', // 运营信息查询
    component: QueryIndexComponent,
    children: [
      {
        path: 'operation',
        component: QueryOperationsComponent,  // 人员资料查询
      },
      {
        path: 'enterprise',
        component: QueryenterpriseComponent, // 企业资料查询
      },
      {
        path: 'vehicle',
        component: QueryVehicleComponent, // 车辆资料查询
      },
      { path: '', redirectTo: 'operation', pathMatch: 'full' },
    ],
  },
  {
    path: 'passingCar', // 过车记录查询
    component: QueryPassingCarComponent,
  },
  {
    path: 'IllegalRecord', // 违法记录查询
    component: QueryIllegalRecordComponent,
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
