import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommandRouterModule} from "./command-router.module";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { CommandIndexComponent } from './command-index/command-index.component';
import { BasicInformationComponent } from './basic-information/basic-information.component';



@NgModule({
  declarations: [CommandIndexComponent, BasicInformationComponent],
  imports: [
    CommonModule,
    CommandRouterModule,
    IonicModule,
    RouterModule,
    FormsModule
  ]
})
export class CommandModule { }
