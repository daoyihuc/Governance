import { Component, OnInit } from '@angular/core';
import {WindowService} from '../../utils/window.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Baseinterface} from "../../interface/baseinterface";

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css']
})
export class BasicInformationComponent implements OnInit,Baseinterface {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  ngOnInit(): void {
  }

  list = [
    {'span': '报警时间：', 'p': '2020-09-27 11:40:57'},
    {'span': '检测点：', 'p': 'G106K1612安定检测点'},
    {'span': '方向：', 'p': '平江往浏阳'},
    {'span': '总重：', 'p': '55100'},
    {'span': '超限量：', 'p': '6100'},
    {'span': '轴数：', 'p': '6'},
    {'span': '超限率：', 'p': '12.45%'}
    ];

  onBack(): void {
    this.windowUntils.onBack();
  }

  onHome(): void {
    this.route.navigate(['/home']);
  }

  onSetting(): void { // 个人中心
    this.route.navigate(['/setting']);
  }
}
