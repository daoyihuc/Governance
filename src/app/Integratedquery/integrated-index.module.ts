import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HomeRouterModule} from '../home/home-router.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {IntegratedrouterModule} from './integratedrouter/integratedrouter.module';
import { IndexComponent } from './index/index.component';
import { QueryIndexComponent } from './query-index/query-index.component';
import { QueryOperationComponent } from './query-operation/query-operation.component';
import { QueryenterpriseComponent } from './queryenterprise/queryenterprise.component';
import { QueryVehicleComponent } from './query-vehicle/query-vehicle.component';



@NgModule({
  declarations: [IndexComponent, QueryIndexComponent, QueryOperationComponent, QueryenterpriseComponent, QueryVehicleComponent],
  imports: [
    RouterModule,
    IntegratedrouterModule,
    IonicModule,
    FormsModule,
    CommonModule,
  ]
})
export class IntegratedIndexModule { }
