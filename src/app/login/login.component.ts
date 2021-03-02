import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {LoginConst} from '../constans/LoginConst';
import {Router} from '@angular/router';
import {SlideVerifyComponent} from '../slide-verify/slide-verify.component';
import {HttpServiceService} from '../http/http-service.service';
import {ToastController} from '@ionic/angular';
import {ToastService} from '../utils/toast.service';


declare var SlidingVerificationCode: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  @ViewChild('slideVerifier1', {static: false}) slideVerifier: SlideVerifyComponent;
  data = {
    username: '',
    password: ''
  };
  remember = false;
  LoginConsts = LoginConst;

  constructor(
    private route: Router,
    private http: HttpServiceService,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("username")){
      this.data.username = sessionStorage.getItem("username");
    }
    if(sessionStorage.getItem("password")){
      this.data.password = sessionStorage.getItem("password");
    }
  }
  judgment(): void{
    if (this.data.username === null || this.data.username === ''){
      // @ts-ignore
      this.toast.presentToast('账号不能为空');
      return ;
    }
    if (this.data.password === null || this.data.password === ''){
      // @ts-ignore
      this.toast.presentToast('密码不能为空');
      return ;
    }
    if (!this.slideVerifier.isVerified()){
      // @ts-ignore
      this.toast.presentToast('还没有验证哦');
      return;
    }
    console.log('daoyi', this.data);
    this.httpLogin(this.data);


  }
  goHome(): void{
    this.judgment();
  }

  // 执行登录
  httpLogin(data): void{
    this.http.Login(data).subscribe(value => {
      console.log('daoyi', value);
      if (value.body.code === 0){
        this.toast.presentToast(value.body.message);
        console.log(value.body.data.token);
        sessionStorage.setItem('token', '' + value.body.data.token); // token存儲
        sessionStorage.setItem('district', value.body.data.unitname);// 行政区域名称
        sessionStorage.setItem('x', value.body.data.xzb);// 经度
        sessionStorage.setItem('y', value.body.data.yzb);// 纬度
        sessionStorage.setItem('name',value.body.data.realName);// 执法人姓名

        if(this.remember){
          sessionStorage.setItem("username",this.data.username);
          sessionStorage.setItem("password",this.data.password);
        }

        this.GetAccessToken();
        // this.route.navigate(['/home']);
      }else{
        this.toast.presentToast(value.body.message);
      }
    }, error => {
      console.log(error);
    });
  }

  GetAccessToken(): void{
    this.http.getAccessToken(null).subscribe( value => {
      const v = value;
      if(v.body.code===0){
        sessionStorage.setItem('AccessToken', v.body.data);// 纬度
        this.route.navigate(['/home']);
      }
    })
  }


}


