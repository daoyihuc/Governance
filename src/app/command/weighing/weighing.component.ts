import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import {HttpServiceService} from "../../http/http-service.service";
import {PageListDate} from "../../http/HttpBean/PageListBean";

@Component({
  selector: 'app-weighing',
  templateUrl: './weighing.component.html',
  styleUrls: ['./weighing.component.scss']
})
export class WeighingComponent implements OnInit {
  pageNow = 1;
  requestData  = {
    "endTime": "",
    "enterpriseName": "",
    "pageNo": this.pageNow,
    "pageSize": 10,
    "startTime": "",
    "station": []
  };
  selectedEnterprise: any; // 企业信息
  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService,
  ) {
    // this.selectedEnterprise.enterpriseName = '';
    this.router.queryParams.subscribe(params => {
      this.selectedEnterprise = params;
      console.log(this.selectedEnterprise);
      this.requestData.station.push(this.selectedEnterprise.enterpriseCode);
    });
  }



  tableData: PageListDate[] = [
    // {name: '夏铎铺镇南方水泥有限公司', car: '湘A9FJ76', id: 1},
    // {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76', id: 2},
    // {name: '夏铎铺镇南方水泥有限公司', car: '湘A9FJ76', id: 3},
    // {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76', id: 4},
  ];
  jumpUrl = [
    {name: '过磅数据', src: '/command/weighing'},
    {name: '视频监控', src: '/command/monitoring'},
    {name: '企业信息详情', src: '/command/enterpriseDetails'}
  ];


  ngOnInit(): void {
   this.pageList(this.requestData);
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

  onDetails(index): void{// 详情
    console.log(index);
    this.route.navigate(['/command/weighingDetails'],
      { queryParams: {id: this.tableData[index].id}});
  }

  onClose(): void{// 关闭
    console.log('关闭');
    this.windowUntils.onBack();
  }
  // 源头企业实时数据查询
  pageList(data): void{
    this.http.pageList(data).subscribe( value => {
      if(value.body.code === 0){
        if(value.body.data.data === null){
          return;
        }
        value.body.data.data.forEach((e,i)=>{
          this.tableData.push(e);
        })
      }
    });
  }
}
