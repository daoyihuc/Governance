import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private route: Router) { }

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
}
