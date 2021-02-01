import { Component, OnInit } from '@angular/core';
import {
  OperationConstans,
  OperationInfoConstans,
  OperationTitle,
  vehicleConstans,
  vehicleInfoConstans,
  vehicleTitle
} from '../constans/queryConst';
import {HttpServiceService} from "../../http/http-service.service";
import {ToastService} from "../../utils/toast.service";

@Component({
  selector: 'app-query-vehicle',
  templateUrl: './query-vehicle.component.html',
  styleUrls: ['./query-vehicle.component.css']
})
export class QueryVehicleComponent implements OnInit {

  name = vehicleTitle;
  serachData = vehicleConstans;
  resultData = vehicleInfoConstans;


  // 网络请求数据
  requestData = {
    "carNumber": ""
  };


  constructor(
    private http: HttpServiceService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
  }

  // 开始查询
  search(): void{
    this.requestData.carNumber=this.serachData[0].value;
    this.Http(this.requestData);
  }


  // 获取驾驶员信息
  Http(data: any): void{
    this.http.carInfo(data).subscribe( value => {
      if (value.body.code === 0){

        if(value.body.data!=null){
          this.CopyData(value.body.data);
          this.toast.presentToast(value.body.message);
        }else{

          this.toast.presentToast("没有相关数据");
        }

      }else{
        this.toast.presentToast(value.body.message);
      }
    });
  }

  // 进行数值赋值
  CopyData(data: any): void{


    this.resultData[7].value=data.blockStatus;// 锁定状态
    this.resultData[0].value=data.carNumber;// 车牌
    this.resultData[1].value=data.color;// 车辆颜色
    this.resultData[5].value=data.endTime;// 截止日期
    // this.resultData[5].value= data.id;// 主键
    this.resultData[6].value=data.operateStatus;// 车辆营运状态
    this.resultData[2].value= data.owner;// 车辆所有人
    // this.resultData[6].value=data.transportIssueDate;// 道路运输证发证时间
    this.resultData[4].value= data.transportIssuingAuthority;// 道路运输证发证机关
    this.resultData[3].value= data.transportLicenseNumber;// 道路运输证号

  }

}
