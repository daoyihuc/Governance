import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CommandIndexComponent} from './command-index/command-index.component';
import {BasicInformationComponent} from './basic-information/basic-information.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {CommandCarComponent} from './command-car/command-car.component';
import {WeighingComponent} from './weighing/weighing.component';
import {MonitoringComponent} from './monitoring/monitoring.component';
import {EnterpriseDetailsComponent} from './enterprise-details/enterprise-details.component';
import {WeighingDetailsComponent} from './weighing-details/weighing-details.component';
import {InspectorComponent} from './inspector/inspector.component';
import {SupervisionInformationComponent} from './supervision-information/supervision-information.component';
import {CsourceIndexComponent} from './csource-index/csource-index.component';
import {CarDetailsComponent} from './car-details/car-details.component';
import {RunMonitoringComponent} from './run-monitoring/run-monitoring.component';
import {RunDiagramComponent} from './run-diagram/run-diagram.component';
import {InspectorRecordComponent} from './inspector-record/inspector-record.component';
import {ShowComponent} from "./show/show.component";
import {ShowDetailsComponent} from "./show-details/show-details.component";

const commandRouter: Routes = [
  {
    path: 'commandIndex', // 路径名称
    component: CommandIndexComponent,  // 组件 <---
    // children: [
    //   {
    //     path: 'commandIndex',
    //     component: CommandIndexComponent,  // 组件 <---
    //   },
    // ],
  },
  {path: 'basicInformation', component: BasicInformationComponent}, // 车辆基本信息
  {path: 'feedback', component: FeedbackComponent}, // 车辆基本信息 信息反馈
  {path: 'commandCar', component: CommandCarComponent}, // 历史违法记录
  {path: 'weighing', component: WeighingComponent}, // 过磅数据
  {path: 'monitoring', component: MonitoringComponent}, // 视频监控
  {path: 'enterpriseDetails', component: EnterpriseDetailsComponent}, // 企业信息详情
  {path: 'weighingDetails', component: WeighingDetailsComponent}, // 实时数据详情内页
  {path: 'inspector', component: InspectorComponent}, // 源头督查
  {path: 'supervisionInformation', component: SupervisionInformationComponent}, // 源头督查 信息
  {path: 'sourceIndex', component: CsourceIndexComponent}, // 源头企业
  {path: 'inspectorRecord', component: InspectorRecordComponent}, // 源头企业-督察记录
  {path: 'carDetails', component: CarDetailsComponent}, // 车辆详情查看
  {path: 'runMonitoring', component: RunMonitoringComponent}, // 运行监测
  {path: 'runDiagram', component: RunDiagramComponent}, // 运行监测 tubiao
  {path: 'showDetails', component: ShowDetailsComponent}, // 图片查看 tubiao
  {path: 'show', component: ShowComponent}, // 视频查看 tubiao
  { path: '', redirectTo: 'commandIndex', pathMatch: 'full' },
  { path: '**', redirectTo: 'commandIndex' },
];

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(commandRouter)
  ],
  declarations: [

  ],
  exports: [RouterModule]
})
export class CommandRouterModule { }
