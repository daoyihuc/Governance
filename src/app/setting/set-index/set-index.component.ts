import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Baseinterface} from "../../interface/baseinterface";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-set-index',
  templateUrl: './set-index.component.html',
  styleUrls: ['./set-index.component.scss']
})
export class SetIndexComponent implements OnInit,Baseinterface {
  name = '设置';
  constructor(
    private route: Router,
    private windowUntils: WindowService,
  ) {

  }
  lists = [
      {name: '用户名', text: sessionStorage.getItem("username")},
      {name: '姓名', text: sessionStorage.getItem("name")},
      {name: '所属单位', text: '第二机动大队'}
      ];
  btns = [
    {text: '修改密码', url: '/setting/changepassword'},
    {text: '系统信息', url: '/setting/information'},
    {text: '注销账号', url: ''}
  ];
  clickBtn = '';
  ngOnInit(): void {
  }

  onBtn(data): void {
    console.log(data);
    this.clickBtn = data.text;
    this.route.navigate([data.url] );
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
