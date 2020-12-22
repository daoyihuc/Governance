import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CommandIndexComponent} from "./command-index/command-index.component";
import {BasicInformationComponent} from "./basic-information/basic-information.component";
import {FeedbackComponent} from './feedback/feedback.component';
import {CommandCarComponent} from "./command-car/command-car.component";
import {WeighingComponent} from "./weighing/weighing.component";
import {MonitoringComponent} from "./monitoring/monitoring.component";
import {EnterpriseDetailsComponent} from "./enterprise-details/enterprise-details.component";

const commandRouter: Routes = [
  {
    path: '', // 路径名称
    component: CommandIndexComponent,  // 组件 <---
    children: [
      {
        path: 'commandIndex',
        component: CommandIndexComponent,  // 组件 <---
      },
    ],
  },
  {path: 'basicInformation', component: BasicInformationComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'commandCar', component: CommandCarComponent},
  {path: 'weighing', component: WeighingComponent},
  {path: 'monitoring', component: MonitoringComponent},
  {path: 'enterpriseDetails', component: EnterpriseDetailsComponent},
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
