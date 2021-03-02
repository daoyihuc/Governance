import { Component, OnInit } from '@angular/core';
import {OperationConstans, OperationInfoConstans, OperationTitle} from '../constans/queryConst';
import {HttpServiceService} from "../../http/http-service.service";
import {ToastService} from "../../utils/toast.service";

@Component({
  selector: 'app-query-operations',
  templateUrl: './query-operations.component.html',
  styleUrls: ['./query-operations.component.css']
})
export class QueryOperationsComponent implements OnInit {
  name = OperationTitle;
  serachData = OperationConstans;
  resultData = OperationInfoConstans;


  // 网络请求数据
  requestData = {
    "name": "",
    "IDNumber": ""
  };

  constructor(
    private http: HttpServiceService, //
    private toast: ToastService,
  ) { }

  ngOnInit(): void {


  }

  // 开始查询
  search(): void{
    this.requestData.name=this.serachData[0].value;
    this.requestData.IDNumber=this.serachData[1].value;
    this.Http(this.requestData);
  }


  // 获取驾驶员信息
  Http(data: any): void{
    this.http.getDriverInfo(data).subscribe( value => {
      if (value.body.code === 0){
        this.toast.presentToast(value.body.message);
        this.CopyData(value.body.data)
      }else{
        this.toast.presentToast(value.body.message);
      }
    });
  }

  // 进行数值赋值
  CopyData(data: any): void{
    this.resultData[10].value=data.address;// 地址
    this.resultData[5].value=data.archiveCode;// 电子档案号
    this.resultData[9].value=data.certificateStatus;// 证书状态
    // this.resultData[6].value=data.driverIssueDate;// 驾驶证发证时间
    // this.resultData[10].value=data.certificateStatus;// 驾驶证发证机关
    // this.resultData[10].value=data.driverLicenseNumber;// 驾驶证号
    this.resultData[7].value= data.endDate;// 有效期止
    // this.resultData[10].value= data.id;// 主键id
    this.resultData[2].value=data.idCode;// 身份证号
    this.resultData[0].value= data.name;// 姓名
    this.resultData[1].value=data.sex;// 驾驶员性别
    this.resultData[3].value= data.telephone;// 联系方式
    this.resultData[6].value= data.workingIssueDate;// 从业资格证发证时间
    // this.resultData[10].value=data.workingIssuingAuthority;// 从业资格证发证机关
    this.resultData[4].value=data.workingQualification;// 从业资格证号
    this.resultData[8].value= data.workingType;// 驾驶员从业类型

  }

}
