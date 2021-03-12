import {Component, ElementRef, OnInit} from '@angular/core';
import {Baseinterface} from "../../interface/baseinterface";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import {passingCatDetailsTitle} from "../constans/queryConst";
import {HttpServiceService} from "../../http/http-service.service";
import {PassCatDetailsBean, passCatDetailsBeanData} from "../../http/HttpBean/PassCatDetailsBean";
import {ToastService} from "../../utils/toast.service";
import {ImgPath} from "../../Base/Constans";
import {ShowDetailsComponent} from "../../command/show-details/show-details.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-passing-cat-details',
  templateUrl: './passing-cat-details.component.html',
  styleUrls: ['./passing-cat-details.component.css']
})
export class PassingCatDetailsComponent implements OnInit, Baseinterface {

  name = passingCatDetailsTitle; // 头部名称

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 2000,
    },
    loop: true
  };
  Imgpath = ImgPath;

  station_Name: string = "";
  responseData: PassCatDetailsBean; // 返回数据

  // 网络请求数据
  requestData = {
    "id": "",
  };

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private el: ElementRef,
    private http: HttpServiceService,//网络请求
    private toast: ToastService,
    private mes: MatDialog, // 站点弹窗

  ) {
    this.requestData.id = this.router.snapshot.paramMap.get("id");
    this.station_Name = this.router.snapshot.paramMap.get("name");
    this.Http(this.requestData);
  }

  ngOnInit(): void {
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

  // 网络数据请求
  Http(data: any): void{
    this.http.carPassQueryGetById(data).subscribe( value => {
      if (value.body.code === 0){
        if(value.body.data!=null){
          this.responseData =  value.body.data;
        }else {
          this.toast.presentToast("数据错误");
        }
      }else{
        this.toast.presentToast(value.body.message);
      }
    });
  }

  // 图片查看
  show(src): void{
    let matDialogRef = this.mes.open(ShowDetailsComponent,{data: src});
  }
}
