import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-supervision-information',
  templateUrl: './supervision-information.component.html',
  styleUrls: ['./supervision-information.component.scss']
})
export class SupervisionInformationComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  liData = [
    {title: '督查时间', text: '2020-09-18 11:22:54'},
    {title: '执法人', text: '吴世勋'},
    {title: '督查地点', text: '夏铎铺镇南方水泥有限公司 '},
  ];
  workData = [
    {text: '1.没有悬挂了治超宣传横幅。'},
    {text: '2.没有悬挂了治超宣传横幅。'},
    {text: '13.没有悬挂了治超宣传横幅。 '},
  ];
  supplement = '该企业负责人在现场，并介绍了超限管理的办法，对督查人\n' +
    '              员指出的不足之处及时安排整改。';
  imgData = [
    {src: '#'},
    {src: '#'},
    {src: '#'},
    {src: '#'},
    {src: '#'},
    {src: '#'},
    {src: '#'},
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

  onJump(): void{// 跳转
    this.windowUntils.onBack();
  }

}
