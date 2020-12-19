import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CommandIndexComponent} from "./command-index/command-index.component";
import {BasicInformationComponent} from "./basic-information/basic-information.component";
import {FeedbackComponent} from './feedback/feedback.component';

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
