import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';
import * as $ from 'jquery';
import {HttpServiceService} from '../../http/http-service.service';
import {ToastController} from '@ionic/angular';
import {ToastService} from '../../utils/toast.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService,
    private toast: ToastService,
  ) { }

  jumpUrl = [
    {name: '过磅数据', src: '/command/weighing'},
    {name: '视频监控', src: '/command/monitoring'},
    {name: '企业信息详情', src: '/command/enterpriseDetails'}
  ];
  videoData = [];
  selectedEnterprise = {
    enterpriseName: '',
    enterpriseCode: ''
  }; // 企业信息

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.selectedEnterprise.enterpriseCode = params.enterpriseCode;
      this.selectedEnterprise.enterpriseName = params.enterpriseName;
    });
    this.getData();
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

  onJump(index): void{// 跳转
    console.log(this.jumpUrl[index].src);
    this.route.navigate([this.jumpUrl[index].src],
      { skipLocationChange: true , queryParams: this.selectedEnterprise});
  }

  // 获取数据
  getData(): void{
    // @ts-ignore
    this.http.getBayonetByCode({
      enterpriseCode: this.selectedEnterprise.enterpriseCode
    }).subscribe(value => {
      if (value.body.code === 0) {
        console.log(value);
        this.videoData = value.body.data;
      } else {
        this.toast.presentToast(value.body.message);
      }
    });
  }


  onClose(): void{// 关闭
    console.log('关闭');
    this.windowUntils.onBack();
  }
}
