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
  liData = [
    {title: '名称', text: '夏铎铺镇南方水泥有限公司 '},
    {title: '地址', text: '夏铎铺镇天马新村11组319国道旁 '},
    {title: '辖区', text: '夏铎铺镇 '},
    {title: '类型', text: '水泥厂 '},
    {title: '责任人', text: '杨林平 '},
    {title: '电话', text: '13254851250 '},
    {title: '吞吐量', text: '440万吨 '},
    {title: '称重设施', text: '有 '},
    {title: '显示屏', text: '无 '},
    {title: '属地监管', text: '夏铎铺镇人民政府 '},
    {title: '属地监管责任人', text: '夏铎铺镇南方水泥有限公司 '},
    {title: '属地监管责任人电话', text: '夏铎铺镇南方水泥有限公司 '},
    {title: '行业监管', text: '夏铎铺镇南方水泥有限公司 '},
    {title: '行业监管责任人', text: '夏铎铺镇南方水泥有限公司 '},
    {title: '行业监管责任人电话', text: '夏铎铺镇南方水泥有限公司 '},
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
