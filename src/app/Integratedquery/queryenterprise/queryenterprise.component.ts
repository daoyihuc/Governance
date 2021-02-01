import { Component, OnInit } from '@angular/core';
import {enterpriseTitle, enterpriseConstans, enterpriseInfoConstans} from '../constans/queryConst';
import {HttpServiceService} from "../../http/http-service.service";
import {ToastService} from "../../utils/toast.service";

@Component({
  selector: 'app-queryenterprise',
  templateUrl: './queryenterprise.component.html',
  styleUrls: ['./queryenterprise.component.css']
})
export class QueryenterpriseComponent implements OnInit {
  name = enterpriseTitle;
  serachData = enterpriseConstans;
  resultData = enterpriseInfoConstans;

  // 网络请求数据
  requestData = {
    "companyName": ""
  };


  constructor(
    private http: HttpServiceService,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
  }


  // 开始查询
  search(): void{
    this.requestData.companyName=this.serachData[0].value;
    this.Http(this.requestData);
  }


  // 获取驾驶员信息
  Http(data: any): void{
    this.http.companyInfo(data).subscribe( value => {
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

    this.resultData[7].value=data.address;// 地址
    this.resultData[0].value=data.affiliatedUnit;// 企业名称
    this.resultData[4].value=data.businessCertificateNumber;// 经营许可证号
    this.resultData[2].value=data.businessIssueDate;// 经营许可证发证时间
    this.resultData[5].value= data.businessIssuingAuthority;// 经营许可证发证机关
    this.resultData[2].value=data.corporate;// 法人代表
    this.resultData[3].value= data.endDate;// 有效期止
    // this.resultData[1].value=data.id;// id
    // this.resultData[3].value= data.socialCode;// 企业信用代码
    this.resultData[6].value=data.telephone;// 联系方式
    this.resultData[1].value= data.type;// 经营类型

  }


}
