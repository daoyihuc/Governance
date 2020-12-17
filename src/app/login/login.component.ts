import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {LoginConst} from '../constans/LoginConst';
import {Router} from '@angular/router';


declare var SlidingVerificationCode: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  data = {
    username: '',
    password: '',
    isCode: false,
    isSessison: false
  };
  LoginConsts = LoginConst;

  constructor(
    private route: Router
  ) {
  }

  ngOnInit(): void {

  }
  judgment(): void{
    if (this.data.username === null || this.data.username === ''){
      // @ts-ignore
      return '账号不能为空';
    }
    if (this.data.password === null || this.data.password === ''){
      // @ts-ignore
      return '密码不能为空';
    }
    if (this.data.isCode){
      // @ts-ignore
      return '还没有验证哦';
    }

  }
  goHome(): void{
    this.route.navigate(['/home']);
  }
  // 执行登录

}


