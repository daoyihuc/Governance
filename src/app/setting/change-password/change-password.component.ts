import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Baseinterface} from "../../interface/baseinterface";
import {WindowService} from "../../utils/window.service";
import {HttpServiceService} from "../../http/http-service.service";
import {ToastService} from "../../utils/toast.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit,Baseinterface {
  name = '密码修改';

  request ={
    newPwd: '',
    oldPwd: '',
    userName: '',
  }

  constructor(
    private route: Router,
    private windowUntils: WindowService,
    private http: HttpServiceService,
    private toast: ToastService,
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
    this.request.oldPwd = this.lists[0].value;
    this.request.newPwd = this.lists[1].value;
    this.request.userName = this.lists[2].value;
    this.HTTP(this.request);
    // this.route.navigate(['/setting/setIndex'] );
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
  HTTP(data): void{
    this.http.updatePass(data).subscribe( value => {

      if(value.body.code === 0){
        this.route.navigate(['/setting/setIndex'] );
      }else {
        this.toast.presentToast(value.body.message);
      }
    });
  }
}
