import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-csource-index',
  templateUrl: './csource-index.component.html',
  styleUrls: ['./csource-index.component.scss']
})
export class CsourceIndexComponent implements OnInit {

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
    {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76' },
    {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76' },
    {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76' },
  ];
  flexUrl = [
    {src: '/command/weighing'},
    {src: '/command/commandCar'},
    {src: '/command/inspector'},
  ];
  serachData = [
    {
      id: 1,
      name: '企业名称',
      placName: '请输入关键字',
      isRead: false,
      isIcon: false,
      value: '',
    },
    {
      id: 2,
      name: '开始时间',
      placName: '请选择开始时间',
      isRead: true,
      isIcon: false,
      value: '',
    }, {
      id: 3,
      name: '结束时间',
      placName: '请选择结束时间',
      isRead: true,
      isIcon: false,
      value: '',
    },
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
    this.route.navigate(['/command/basicInformation']);
  }

  onFlexJump(index): void{// 跳转
    this.route.navigate([this.flexUrl[index].src]);
  }

  onDetails(index): void{// 详情
    console.log(index);
    // this.route.navigate(['/command/weighingDetails']);
  }

}
