import {Component, ElementRef, OnInit} from '@angular/core';
import {Baseinterface} from '../../interface/baseinterface';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';
import { PassingCarConstans, passingCarName} from '../constans/queryConst';
import {MatDialog} from "@angular/material/dialog";
import {HttpServiceService} from "../../http/http-service.service";
import {SiteSelectionComponent} from "../site-selection/site-selection.component";

@Component({
  selector: 'app-query-passing-car',
  templateUrl: './query-passing-car.component.html',
  styleUrls: ['./query-passing-car.component.css']
})
export class QueryPassingCarComponent implements OnInit, Baseinterface {



  total: number = 20;
  pagesize: number= 10;

  listOfData = [
    {
      "id": "string",
      "overLimited": "string", // 超限量 单位 kg
      "stationName": "string",
      "truckNoFront": "string", // 货车前牌号
    }
  ];

  // 站点
  station: any = [];
  // 网络请求数据
  requestData = {
    "carNumber": "",
    "endTime": "",
    "orderBy": "",
    "pageNo": 1,
    "pageSize": 10,
    "provinceCode": "",
    "startTime": "",
    "station": this.station
  };

  name = passingCarName;
  serachData = PassingCarConstans;

  minTime = new Date().toISOString(); // 最小时间
  customPickerOptionsStart: any; //开始时间设置
  customPickerOptionsEnd: any; //结束时间设置

  // 绑定时间
  ValueTimeStart: any;
  ValueTimeEnd: any;

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private el: ElementRef,
    private mes: MatDialog, // 站点弹窗
    private http: HttpServiceService,//网络请求
  ) {
    this.customPickerOptionsStart = {
      buttons: [{
        text: '取消',
        handler: (a) => {
          console.log('Clicked save'+JSON.stringify(a));
          let b=JSON.stringify(a);
          const c=JSON.parse(b);
          const year=c.year.value;
          const month=c.month.value;
          const day=c.day.value;
          const hour=c.hour.value;
          const minute=c.minute.value;
          this.ValueTimeStart = year+month+day+hour+minute;
          // this.InputDatas[2].value = this.ValueTime;
          this.serachData[2].value = "";
          this.serachData[2].value2 = "";
          return a;
        }
      }, {
        text: '确定',
        handler: (a) => {
          let b=JSON.stringify(a);
          const c=JSON.parse(b);
          const year=c.year.value;
          const month=c.month.value;
          const day=c.day.value;
          const hour=c.hour.value;
          const minute=c.minute.value;
          this.ValueTimeStart = year+'年'+month+'月'+day+'日'+hour+'点'+minute;
          const ValueTimeStart2 = year+'-'+month+'-'+day+' '+hour+':'+minute;
          this.serachData[2].value = this.ValueTimeStart;
          this.serachData[2].value2 = ValueTimeStart2;
          console.log('Clicked Log. Do not Dismiss.'+this.ValueTimeStart);
          return a;
        }
      }]
    }
    this.customPickerOptionsEnd = {
      buttons: [{
        text: '取消',
        handler: (a) => {
          console.log('Clicked save'+JSON.stringify(a));
          let b=JSON.stringify(a);
          const c=JSON.parse(b);
          const year=c.year.value;
          const month=c.month.value;
          const day=c.day.value;
          const hour=c.hour.value;
          const minute=c.minute.value;
          this.ValueTimeEnd = year+month+day+hour+minute;
          // this.InputDatas[2].value = this.ValueTime;
          this.serachData[3].value = "";
          this.serachData[3].value2 = "";
          return a;
        }
      }, {
        text: '确定',
        handler: (a) => {
          let b=JSON.stringify(a);
          const c=JSON.parse(b);
          const year=c.year.value;
          const month=c.month.value;
          const day=c.day.value;
          const hour=c.hour.value;
          const minute=c.minute.value;
          this.ValueTimeEnd = year+'年'+month+'月'+day+'日'+hour+'点'+minute;
          this.serachData[3].value = this.ValueTimeEnd;
          const ValueTimeStart2 = year+'-'+month+'-'+day+' '+hour+':'+minute;
          this.serachData[3].value2 = ValueTimeStart2;
          console.log('Clicked Log. Do not Dismiss.'+this.ValueTimeEnd);
          return a;
        }
      }]
    }

    this.HttpAll(this.requestData);
  }

  ngOnInit(): void {
  }

  onBack(): void {
    // this.windowUntils.onBack();
    this.route.navigate(['/queryAll']);
  }

  onHome(): void {
    this.route.navigate(['/home']);

  }

  onSetting(): void { // 个人中心
    this.route.navigate(['/setting']);
  }

  // 点击事件
  onClick(id,index,): void{
    switch (id){
      case 0: // 站点选择
        const matDialogRef = this.mes.open(SiteSelectionComponent);
        matDialogRef.afterClosed().subscribe(value => {
          // console.log(value.data);
          this.serachData[0].value = "";
          for(let i=0;i<value.data.length;i++){
            this.station.push(value.data[i].id);
            this.serachData[0].value += value.data[i].name + " ";
          }
          this.requestData.station = this.station;
        });

        break;
      case 1: // 车牌号码

        break;
      case 2: // 开始时间
        let query = this.el.nativeElement.querySelector('#times');
        query.dispatchEvent(new Event('click'));
        break;
      case 3: // 结束时间
        let query2 = this.el.nativeElement.querySelector('#timesEnd');
        query2.dispatchEvent(new Event('click'));
        break;
      case 4:
        this.requestData.startTime = this.serachData[2].value2;
        this.requestData.endTime = this.serachData[3].value2;
        this.requestData.carNumber = this.serachData[1].value;
        console.log('daoyi',this.requestData);
        this.HttpAll(this.requestData);
        break;
    }
  }


  // 查看本区域所有违法记录
  HttpAll(data: any): void{
    this.http.carPassQueryPageList(data).subscribe( value => {

      //
      if(value.body.code === 0 ){
        console.log(value.body.data);
        this.listOfData = [];
        for(let i=0;i<value.body.data.data.length;i++){
          // @ts-ignore
          this.listOfData.push(value.body.data.data[i]);
          this.total = value.body.data.totalRows;
        }
      }

    });
  }
  PageIndexChange(number): void{
    // 打印当前页码
    console.log(number);
    this.requestData.pageNo = number;
    this.HttpAll(this.requestData);
  }

  // 查看详情
  showDetails(data: any): void{
    this.route.navigate(['queryAll/PassingCatDetails',{id:data.id,name: data.stationName}])
  }
}
