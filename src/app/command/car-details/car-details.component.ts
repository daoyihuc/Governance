import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  list = [
    {span: '过车时间：', p: '2020-09-27 11:40:57'},
    {span: '过车地点：', p: 'S207金井非现场检测点'},
    {span: '行驶方向：', p: '益阳往宁乡'},
    {span: '轴数：', p: '3'},
    {span: '总重：', p: '6100'},
    {span: '限重：', p: '6'},
    {span: '超限量：', p: '6'},
    {span: '超限率：', p: '12.45%'}
  ];

  list2Data = [
    {span: '道路运输证：', p: '430124008914'},
    {span: '发证机关：', p: '长沙县交通运输局'},
    {span: '证件有效期止：', p: '2022-07-15'},
    {span: '所有人：', p: '胡云刚'},
  ];

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

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
