import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-weighing',
  templateUrl: './weighing.component.html',
  styleUrls: ['./weighing.component.scss']
})
export class WeighingComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  tableData = [
    {name: '夏铎铺镇南方水泥有限公司', car: '湘A9FJ76' },
    {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76' },
    {name: '夏铎铺镇南方水泥有限公司', car: '湘A9FJ76' },
    {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76' },
  ];
  jumpUrl = [
    {name: '过磅数据', src: '/command/weighing'},
    {name: '视频监控', src: '/command/monitoring'},
    {name: '企业信息详情', src: '/command/enterpriseDetails'}
  ];
  selectedEnterprise: any = {}; // 企业信息

  ngOnInit(): void {
    this.selectedEnterprise.enterpriseName = '';
    this.router.queryParams.subscribe(params => {
      this.selectedEnterprise = params;
    });
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
    this.route.navigate([this.jumpUrl[index].src],
      { skipLocationChange: true , queryParams: this.selectedEnterprise});
  }

  onDetails(index): void{// 详情
    console.log(index);
    this.route.navigate(['/command/weighingDetails']);
  }

  onClose(): void{// 关闭
    console.log('关闭');
    this.windowUntils.onBack();
  }
}
