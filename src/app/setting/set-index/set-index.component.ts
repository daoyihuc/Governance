import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-set-index',
  templateUrl: './set-index.component.html',
  styleUrls: ['./set-index.component.css']
})
export class SetIndexComponent implements OnInit {

  constructor(private route: Router) {

  }
  lists = [
      {name: '用户名', text: 'xa548153'},
      {name: '姓名', text: '徐璈'},
      {name: '所属单位', text: '第二机动大队'}
      ];
  btns = [
    {text: '修改密码', url: '/setting/changepassword'},
    {text: '系统信息', url: '/setting/information'},
    {text: '注销账号', url: '/setting/information'}
  ];
  clickBtn = '';
  ngOnInit(): void {
  }

  onBtn(data): void {
    console.log(data);
    this.clickBtn = data.text;
    this.route.navigate([data.url] );
  }

}
