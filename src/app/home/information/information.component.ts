import { Component, OnInit } from '@angular/core';
import {Baseinterface} from '../../interface/baseinterface';
import {InformationConst} from '../../constans/informationConst';
import {WindowService} from '../../utils/window.service';
import {ActivatedRoute, Router} from "@angular/router";
import {HomeConstansInfo} from "../constans/HomeConstans";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit, Baseinterface{

  datas = InformationConst;
  InputDatas = HomeConstansInfo;
  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  ngOnInit(): void {
  }

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
