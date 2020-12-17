import { Component, OnInit } from '@angular/core';
import {log} from "util";

@Component({
  selector: 'app-set-index',
  templateUrl: './set-index.component.html',
  styleUrls: ['./set-index.component.css']
})
export class SetIndexComponent implements OnInit {

  constructor() { }
  lists = [
      {name: '用户名', text: 'xa548153'},
      {name: '姓名', text: '徐璈'},
      {name: '所属单位', text: '第二机动大队'}
      ];
  btns = [
    {text: '修改密码'},
    {text: '系统信息'},
    {text: '注销账号'}
  ];
  clickBtn = '';
  ngOnInit(): void {
  }

  onBtn(data): void {
    console.log(data);
    this.clickBtn = data.text;
  }

}
