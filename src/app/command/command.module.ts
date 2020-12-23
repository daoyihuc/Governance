import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommandRouterModule} from "./command-router.module";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { CommandIndexComponent } from './command-index/command-index.component';
import { BasicInformationComponent } from './basic-information/basic-information.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CommandCarComponent } from './command-car/command-car.component';
import { WeighingComponent } from './weighing/weighing.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { EnterpriseDetailsComponent } from './enterprise-details/enterprise-details.component';



@NgModule({
  declarations: [CommandIndexComponent, BasicInformationComponent, FeedbackComponent, CommandCarComponent, WeighingComponent, MonitoringComponent, EnterpriseDetailsComponent],
  imports: [
    CommonModule,
    CommandRouterModule,
    IonicModule,
    RouterModule,
    FormsModule
  ]
})
export class CommandModule { }
