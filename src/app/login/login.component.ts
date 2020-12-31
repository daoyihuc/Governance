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
    this.httpLogin(this.data);

  }
  goHome(): void{
    this.judgment();
  }

  // 执行登录
  httpLogin(data): void{
    this.http.Login(data).subscribe(value => {
      console.log(value);
      if (value.body.code === 0){
        sessionStorage.setItem('token', '' + value.body.data); // token存儲
        this.route.navigate(['/home']);
      }else{
        this.toast.presentToast(value.body.message);
      }
    });
  }


}


