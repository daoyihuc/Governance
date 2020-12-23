import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-enterprise-details',
  templateUrl: './enterprise-details.component.html',
  styleUrls: ['./enterprise-details.component.scss']
})
export class EnterpriseDetailsComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  jumpUrl = [
    {name: '过磅数据', src: '/command/weighing'},
    {name: '视频监控', src: '/command/monitoring'},
    {name: '企业信息详情', src: '/command/enterpriseDetails'}
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

  onJump(index): void{// 跳转
    console.log(this.jumpUrl[index].src);
    this.route.navigate([this.jumpUrl[index].src]);
  }


  onClose(): void{// 关闭
    console.log('关闭');
  }
}
