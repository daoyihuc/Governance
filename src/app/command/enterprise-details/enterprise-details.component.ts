import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';
import * as $ from 'jquery';
import {HttpServiceService} from '../../http/http-service.service';
import {ToastController} from '@ionic/angular';
import {ToastService} from '../../utils/toast.service';

@Component({
  selector: 'app-enterprise-details',
  templateUrl: './enterprise-details.component.html',
  styleUrls: ['./enterprise-details.component.scss']
})
export class EnterpriseDetailsComponent implements OnInit {

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
  liData = [
    {title: '名称', text: '夏铎铺镇南方水泥有限公司 '},
    {title: '地址', text: '夏铎铺镇天马新村11组319国道旁 '},
    {title: '辖区', text: '夏铎铺镇 '},
    {title: '类型', text: '水泥厂 '},
    {title: '责任人', text: '杨林平 '},
    {title: '电话', text: '13254851250 '},
    {title: '吞吐量', text: '440万吨 '},
    {title: '称重设施', text: '有 '},
    {title: '显示屏', text: '无 '},
    {title: '属地监管', text: '夏铎铺镇人民政府 '},
    {title: '属地监管责任人', text: '夏铎铺镇南方水泥有限公司 '},
    {title: '属地监管责任人电话', text: '夏铎铺镇南方水泥有限公司 '},
    {title: '行业监管', text: '夏铎铺镇南方水泥有限公司 '},
    {title: '行业监管责任人', text: '夏铎铺镇南方水泥有限公司 '},
    {title: '行业监管责任人电话', text: '夏铎铺镇南方水泥有限公司 '},
  ];
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
    this.http.getInfoByCode({
      enterpriseCode: this.selectedEnterprise.enterpriseCode
    }).subscribe(value => {
      console.log(value);
      if (value.body.code === 0){
        console.log(value);
        const item = this.liData;
        item[0].text = this.selectedEnterprise.enterpriseName;
        if (value.body.data){
          const data = value.body.data;
          item[1].text = data.address;
          item[3].text = data.type;
          item[4].text = data.enterpriseDuty;
          item[5].text = data.telephone1;
          item[6].text = data.throughput;
          item[7].text = data.weighFacility;
          item[8].text = data.viewScreen	;
          item[9].text = data.popedomDutyUnit	;
          item[10].text = data.popedomDuty	;
          item[11].text = data.telephone2	;
          item[12].text = data.tradeDutyUnit	;
          item[13].text = data.tradeDuty	;
          item[14].text = data.telephone3	;
        }
      }else{
        this.toast.presentToast(value.body.message);
      }
    });
  }


  onClose(): void{// 关闭
    console.log('关闭');
    this.windowUntils.onBack();
  }
}
