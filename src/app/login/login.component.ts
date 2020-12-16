import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';


declare var SlidingVerificationCode: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
    this.inits();
  }

  public inits(): void {
    const that = this;
    console.log($('div:hidden').find('#captcha').get(0));
    console.log($('div').find('#captcha').get(0));
    const eles = ($('div:hidden').find('#captcha').length > 0) ? $('div:hidden').find('#captcha').get(0) : $('div').find('#captcha').get(0);
    SlidingVerificationCode.init(eles, () => {
      document.getElementById('msg').innerHTML = '初始化成功！';
    }, () => {
      document.getElementById('msg').innerHTML = '初始化失败！';
    });
  }
}


