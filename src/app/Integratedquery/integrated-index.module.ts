import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HomeRouterModule} from '../home/home-router.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {IntegratedrouterModule} from './integratedrouter/integratedrouter.module';
import { IndexComponent } from './index/index.component';
import { QueryIndexComponent } from './query-index/query-index.component';
import { QueryenterpriseComponent } from './queryenterprise/queryenterprise.component';
import { QueryVehicleComponent } from './query-vehicle/query-vehicle.component';
import { QueryOperationsComponent } from './query-operations/query-operations.component';
import { QueryPassingCarComponent } from './query-passing-car/query-passing-car.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { QueryIllegalRecordComponent } from './query-illegal-record/query-illegal-record.component';
import { PassingCatDetailsComponent } from './passing-cat-details/passing-cat-details.component';
import { IllegalDetailsComponent } from './illegal-details/illegal-details.component';
import { StatisticsIndexComponent } from './statistics-index/statistics-index.component';
import { StatisticsOverrunrateComponent } from './statistics-overrunrate/statistics-overrunrate.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { StatisticsOverLimitComponent } from './statistics-over-limit/statistics-over-limit.component';
import { StatisticsDomicileComponent } from './statistics-domicile/statistics-domicile.component';



@NgModule({
  declarations: [IndexComponent, QueryIndexComponent, QueryenterpriseComponent, QueryVehicleComponent, QueryOperationsComponent, QueryPassingCarComponent, QueryIllegalRecordComponent, PassingCatDetailsComponent, IllegalDetailsComponent, StatisticsIndexComponent, StatisticsOverrunrateComponent, StatisticsOverLimitComponent, StatisticsDomicileComponent],
    imports: [
        RouterModule,
        IntegratedrouterModule,
        IonicModule,
        FormsModule,
        CommonModule,
        NzTableModule,
        NgxEchartsModule,
    ]
})
export class IntegratedIndexModule { }
