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



@NgModule({
  declarations: [IndexComponent, QueryIndexComponent, QueryenterpriseComponent, QueryVehicleComponent, QueryOperationsComponent, QueryPassingCarComponent],
  imports: [
    RouterModule,
    IntegratedrouterModule,
    IonicModule,
    FormsModule,
    CommonModule,
  ]
})
export class IntegratedIndexModule { }
