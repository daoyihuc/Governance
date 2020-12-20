import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {HomeRouterModule} from "../home/home-router.module";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {IntegratedrouterModule} from "./integratedrouter/integratedrouter.module";
import { IndexComponent } from './index/index.component';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    RouterModule,
    IntegratedrouterModule,
    IonicModule,
    FormsModule,
  ]
})
export class IntegratedIndexModule { }
