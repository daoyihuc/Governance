import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import {HttpServiceService} from "../../http/http-service.service";
import {ImgPath} from "../../Base/Constans";
import {MatDialog} from "@angular/material/dialog";
import {ShowDetailsComponent} from "../show-details/show-details.component";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  requestData = {
    truckId: ''
  };

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService,
    private mes: MatDialog, // 站点弹窗
  ) {
    this.requestData.truckId = this.router.snapshot.paramMap.get("id");
  }

  carNumber = "";
  banner = [];
  ImgPath = ImgPath;

  list = [
    {span: '过车时间：', p: ''},
    {span: '过车地点：', p: ''},
    {span: '行驶方向：', p: ''},
    {span: '轴数：', p: ''},
    {span: '总重：', p: ''},
    {span: '限重：', p: ''},
    {span: '超限量：', p: ''},
    {span: '超限率：', p: ''}
  ];

  list2Data = [
    {span: '道路运输证：', p: ''},
    {span: '发证机关：', p: ''},
    {span: '证件有效期止：', p: ''},
    {span: '所有人：', p: ''},
  ];

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

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

  Http(data): void{
    this.http.truckInfo(data).subscribe( value => {
      if(value.body.code===0){
        this.carNumber = value.body.data.carPassVO.truckNoFront;
        this.list[0].p = value.body.data.carPassVO.previewDate;
        this.list[1].p = value.body.data.carPassVO.stationName;
        this.list[2].p = value.body.data.carPassVO.direction;
        this.list[3].p = value.body.data.carPassVO.axisNum;
        this.list[4].p = value.body.data.carPassVO.totalWeight;
        this.list[5].p = value.body.data.carPassVO.weightLimited;
        this.list[6].p = value.body.data.carPassVO.overLimited;
        this.list[7].p = value.body.data.carPassVO.overRate;

        if(value.body.data.carInfo !=null){
          this.list2Data[0].p = value.body.data.carInfo.transportLicenseNumber;
          this.list2Data[1].p = value.body.data.carInfo.transportIssuingAuthority;
          this.list2Data[2].p = value.body.data.carInfo.transportIssueDate;
          this.list2Data[3].p = value.body.data.carInfo.owner;
        }

        value.body.data.carPassImgInfoVO.imgFileList.forEach((e,i)=>{
          this.banner.push(e);
        })
      }
    })
  }
  // 图片查看
  show(src): void{
    let matDialogRef = this.mes.open(ShowDetailsComponent,{data: src});
  }
}
