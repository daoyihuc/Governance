import {Component, ElementRef, OnInit} from '@angular/core';
import {IllegalRecordConstans, IllegalRecordName, PassingCarConstans, passingCarName} from "../constans/queryConst";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import {HttpServiceService} from "../../http/http-service.service";
import {MatDialog} from "@angular/material/dialog";
import {SiteSelectionComponent} from "../site-selection/site-selection.component";

@Component({
  selector: 'app-query-illegal-record',
  templateUrl: './query-illegal-record.component.html',
  styleUrls: ['./query-illegal-record.component.css']
})
export class QueryIllegalRecordComponent implements OnInit {

  listOfData = [
    {
      "carNumber": "string",  // 车牌号码
      "id": "string",   // 过车主键ID
      "operateTime": "2021-01-26T11:46:35.296Z",  // 办理时间
      "operateUser": "string",   // 办理人
      "stationName": "string",     // 站点名称
      "step": "string"   // 案件状态 3：未处理 4：已处理
    }
  ];
  name = IllegalRecordName;
  serachData = IllegalRecordConstans;

  minTime = new Date().toISOString(); // 最小时间
  customPickerOptionsStart: any; //开始时间设置
  customPickerOptionsEnd: any; //结束时间设置

  total: number = 20;
  pagesize: number= 10;

  // 绑定时间
  ValueTimeStart: any;
  ValueTimeEnd: any;


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
          this.serachData[3].value = "";
          this.serachData[3].value2 = "";
          // this.InputDatas[2].value = this.ValueTime;
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
  }

  ngOnInit(): void {
     // 请求所有违法数据
     this.HttpAll(this.requestData);
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
   // 查看详情
  showDetails(data: any): void{
    this.route.navigate(['queryAll/IllegalDetails'])
  }

  // 查看本区域所有违法记录
  HttpAll(data: any): void{
    this.http.illegalQueryPageList(data).subscribe( value => {

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

}
