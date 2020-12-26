import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss']
})
export class InspectorComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  liData = [
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: false},
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: true},
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: false},
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: false},
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
