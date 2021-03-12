import {Component, ElementRef, OnInit} from '@angular/core';
import {illtegalDetailsTitle} from "../constans/queryConst";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import {HttpServiceService} from "../../http/http-service.service";
import {IllegalQueryGetByIdBean, IllegalQueryGetByIdBeanData} from "../../http/HttpBean/IllegalQueryGetByIdBean";
import { ImgPath } from 'src/app/Base/Constans';
import {MatDialog} from "@angular/material/dialog";
import {ShowDetailsComponent} from "../../command/show-details/show-details.component";

@Component({
  selector: 'app-illegal-details',
  templateUrl: './illegal-details.component.html',
  styleUrls: ['./illegal-details.component.css']
})
export class IllegalDetailsComponent implements OnInit {
  name = illtegalDetailsTitle; // 头部名称


  operateUser = '';
  carNumber = '';
  stationName = '';
  operateTime = '';
  step = '';
  ImgPaths = ImgPath;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 2000,
    },
    loop: true
  };

  // 网络请求数据
  requestData = {
    id: ''
  };

  // 返回数据
  responseData: IllegalQueryGetByIdBean;



  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private el: ElementRef,
    private mes: MatDialog, // 站点弹窗
    private http: HttpServiceService,//网络请求

  ) {

    this.requestData.id = this.router.snapshot.paramMap.get("id");
    this.operateUser = this.router.snapshot.paramMap.get("name");
    this.carNumber = this.router.snapshot.paramMap.get('carnumber');
    this.stationName = this.router.snapshot.paramMap.get('stationName');
    this.operateTime = this.router.snapshot.paramMap.get('operateTime');
    this.step = this.router.snapshot.paramMap.get("step");

  }

  ngOnInit(): void {
    this.Http(this.requestData);
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

  // http
  Http(data): any{
    this.http.illegalQueryGetById(data).subscribe( value => {
      if(value.body.code === 0){
        this.responseData =value.body.data;
      }
    });
  }
  // 图片查看
  show(src): void{
    let matDialogRef = this.mes.open(ShowDetailsComponent,{data: src});
  }

}
