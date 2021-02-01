import { Component, OnInit } from '@angular/core';
import {WindowService} from '../../utils/window.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Baseinterface} from '../../interface/baseinterface';
import {HttpServiceService} from "../../http/http-service.service";
import {EnforcementLedgerVOList} from "../../http/HttpBean/GetAlarmRecordJumpDetailsBean";
import {ImgPath} from "../../Base/Constans";

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css']
})
export class BasicInformationComponent implements OnInit, Baseinterface {

  RequestData = {
    carNumber: "",
    carPassId: ""
  }

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService,
  ) {
    this.RequestData.carNumber = this.router.snapshot.paramMap.get("carNumber");
    this.RequestData.carPassId = this.router.snapshot.paramMap.get("id");
  }

  ImgPath = ImgPath;
  status = 0;

  list = [
    {span: '所属人员：', p: '2020-09-27 11:40:57'},
    {span: '车牌号码：', p: 'G106K1612安定检测点'},
    {span: '车牌颜色：', p: '平江往浏阳'},
    {span: '道路运输证号：', p: '55100'},
    {span: '管理机构：', p: '6100'},
    {span: '有效期止：', p: '6'},
    {span: '营运状态：', p: '12.45%'},
    {span: '锁定状态：', p: '12.45%'},
    ];

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 2000,
    },
    loop: true
  };
  banner = [];
  IllegalList: EnforcementLedgerVOList[]=[];

  ngOnInit(): void {
    this.HttpAll(this.RequestData);
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
    if (index === 1){
      this.route.navigate(['/command/feedback',{
        carNumber: this.RequestData.carNumber,
        banner: this.banner}]
      );
    }else if (index === 2){
      this.route.navigate(['/command/commandCar',{
        carNumber: this.RequestData.carNumber,
      }]);
    }
  }

  // 获取详情
  HttpAll(data): void{
    this.http.getAlarmRecordJumpDetails(data).subscribe(value => {

      if(value.body.code === 0){
        const  a =value.body.data;
        // banner
        this.list[0].p = a.carInfo.owner;
        this.list[1].p = a.carInfo.carNumber;
        this.list[2].p = a.carInfo.color;
        this.list[3].p = a.carInfo.transportLicenseNumber;
        this.list[4].p = a.carInfo.transportIssuingAuthority;
        this.list[5].p = a.carInfo.transportIssueDate;
        this.list[6].p = a.carInfo.operateStatus;
        this.list[7].p = a.carInfo.blockStatus;

        a.carPassImgInfoVO.imgFileList.forEach( (e,i) =>{
          this.banner.push(e);
        })

        a.illegalStatInfo.enforcementLedgerVOList.forEach((e,i) => {
         this.IllegalList.push(e);
        });
        this.status= a.illegalStatInfo.unDealNum;
      }


    })
  }
}
