import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommandRouterModule} from './command-router.module';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
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
import { NgxEchartsModule } from 'ngx-echarts';
import { ShowComponent } from './show/show.component';


@NgModule({
  declarations: [
    CommandIndexComponent,
    BasicInformationComponent,
    FeedbackComponent,
    CommandCarComponent,
    WeighingComponent,
    MonitoringComponent,
    EnterpriseDetailsComponent,
    WeighingDetailsComponent,
    InspectorComponent,
    SupervisionInformationComponent,
    CsourceIndexComponent,
    CarDetailsComponent,
    RunMonitoringComponent,
    RunDiagramComponent,
    InspectorRecordComponent,
    ShowComponent],
  imports: [
    CommonModule,
    CommandRouterModule,
    IonicModule,
    RouterModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ]
})
export class CommandModule {
}
