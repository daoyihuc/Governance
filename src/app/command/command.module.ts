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



@NgModule({
  declarations: [CommandIndexComponent, BasicInformationComponent, FeedbackComponent, CommandCarComponent],
  imports: [
    CommonModule,
    CommandRouterModule,
    IonicModule,
    RouterModule,
    FormsModule
  ]
})
export class CommandModule { }
