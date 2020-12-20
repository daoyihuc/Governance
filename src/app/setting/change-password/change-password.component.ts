import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Baseinterface} from "../../interface/baseinterface";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit,Baseinterface {
  name = '密码修改';
  constructor(
    private route: Router,
    private windowUntils: WindowService,
  ) { }

  ngOnInit(): void {
  }
  lists = [
    {name: '原密码', text: '请输入原密码', value: ''},
    {name: '新密码', text: '请输入新密码', value: ''},
    {name: '密码确认', text: '请确认新密码', value: ''}
  ];
  jump(): void {
    console.log(this.lists);
    this.route.navigate(['/setting/setIndex'] );
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
