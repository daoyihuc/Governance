import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-weighing-details',
  templateUrl: './weighing-details.component.html',
  styleUrls: ['./weighing-details.component.scss']
})
export class WeighingDetailsComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  liData = [
    {title: '车牌号码', src: '#'},
    {title: '检测编码', text: '10675 '},
    {title: '过车时间', text: '2020-09-08 15:17:32 '},
    {title: '轴数', text: '6 '},
    {title: '车货总重（吨）', text: '49000 '},
    {title: '车货限重（吨）', text: '49000 '},
    {title: '超限量（吨）', text: '0 '},
    {title: '超限率（%）', text: '0 '},
  ];

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


  onClose(): void{// 关闭
    console.log('1231232');
    this.route.navigate(['/command/weighing']);
  }

}
