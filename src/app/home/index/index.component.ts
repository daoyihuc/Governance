import { Component, OnInit } from '@angular/core';
import {BaseConst} from '../../constans/BaseConst';
import {ActivatedRoute, Router} from '@angular/router';
import {Baseinterface} from '../../interface/baseinterface';
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, Baseinterface {

  datas = BaseConst ;

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private window: WindowService, // 系统服务
  ) { }

  ngOnInit(): void {
  }

  onBack(): void {
    this.window.onBack();
  }


}
