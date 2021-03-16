import {Component, ElementRef, OnInit} from '@angular/core';
// @ts-ignore
import {OverrunrateConstans} from '../constans/queryConst';

import * as echars from 'echarts';
import * as $ from 'jquery';
import {MatDialog} from '@angular/material/dialog';
import {PickerController} from '@ionic/angular';
import {SiteSelectionComponent} from '../site-selection/site-selection.component';
import {HttpServiceService} from "../../http/http-service.service";

@Component({
  selector: 'app-statistics-overrunrate',
  templateUrl: './statistics-overrunrate.component.html',
  styleUrls: ['./statistics-overrunrate.component.css']
})
export class StatisticsOverrunrateComponent implements OnInit {

  serachData = OverrunrateConstans;

  total: number = 20;
  pagesize: number= 10;

  MonitoringPoints = []; // 监测点名称
  OverrunRate = []; // 数值

  option = {
    color: ['#3398DB'],
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      position(point, params, dom, rect, size): void {
        dom.style.transform = 'translateZ(0)';
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        // data: [
        //   {
        //     textStyle: {
        //       width: 50,
        //     },
        //     value: "养鱼塘超限检测站"
        //   }
        //   ],
        data: this.MonitoringPoints,
        axisTick: {
          alignWithLabel: true
        },
        nameTextStyle: {
          width: 50,

        },
        axisLabel: {
          overflow: "truncate",
          ellipsis: "...",
          width: 50
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '超限率',
        type: 'bar',
        barWidth: '60%',
        data: this.OverrunRate
        // data: [100,100,100,200]
      }
    ]
  };
  barStyle = {
    width: 300,
    height: 300
  };

  listOfData = [
    {
      "gcl": 0,
      "oln": 0,
      "olr": "string",
      "stationName": "string"
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

  // 绑定时间
  ValueTimeStart: any;
  ValueTimeEnd: any;

  minTime = new Date(new Date().getTime()+8*60*60*1000).toISOString(); // 最小时间
  customPickerOptionsStart: any; //开始时间设置
  customPickerOptionsEnd: any; //结束时间设置





  constructor(
    private el: ElementRef,
    private mes: MatDialog,
    private pickerController: PickerController,
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
          const hour=c.hour.value.toString().length>1?c.hour.value:"0"+c.hour.value;
          const minute=c.minute.value.toString().length>1?c.minute.value:"0"+c.minute.value;
          this.ValueTimeStart = year+month+day+hour+minute;
          this.serachData[1].value = "";
          this.serachData[1].value2 = "";
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
          const hour=c.hour.value.toString().length>1?c.hour.value:"0"+c.hour.value;
          const minute=c.minute.value.toString().length>1?c.minute.value:"0"+c.minute.value;
          this.ValueTimeStart = year+'年'+month+'月'+day+'日'+hour+'点'+minute;
          const ValueTimeStart2 = year+'-'+month+'-'+day+' '+hour+':'+minute;
          this.serachData[1].value = this.ValueTimeStart;
          this.serachData[1].value2 = ValueTimeStart2;
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
          const hour=c.hour.value.toString().length>1?c.hour.value:"0"+c.hour.value;
          const minute=c.minute.value.toString().length>1?c.minute.value:"0"+c.minute.value;
          this.ValueTimeEnd = year+month+day+hour+minute;
          this.serachData[2].value = "";
          this.serachData[2].value2 = "";
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
          const hour=c.hour.value.toString().length>1?c.hour.value:"0"+c.hour.value;
          const minute=c.minute.value.toString().length>1?c.minute.value:"0"+c.minute.value;
          this.ValueTimeEnd = year+'年'+month+'月'+day+'日'+hour+'点'+minute;
          this.serachData[2].value = this.ValueTimeEnd;
          const ValueTimeStart2 = year+'-'+month+'-'+day+' '+hour+':'+minute;
          this.serachData[2].value2 = ValueTimeStart2;
          console.log('Clicked Log. Do not Dismiss.'+this.ValueTimeEnd);
          return a;
        }
      }]
    }


  }


  ngOnInit(): void {
    const a = this.el.nativeElement.querySelector('#cons0');
    this.barStyle.width = $(window).width() - 30;
    // this.barStyle.height =  $(window).height();

    this.HttpAll(this.requestData);

  }


  OnClick(id, index): void{
    switch (id){
      case 0:
        const matDialogRef = this.mes.open(SiteSelectionComponent);
        matDialogRef.afterClosed().subscribe(value => {
          console.log(value);
          this.serachData[0].value = "";
          for(let i=0;i<value.data.length;i++){
            this.station.push(value.data[i].id);
            this.serachData[0].value += value.data[i].name + " ";
          }
          this.requestData.station = this.station;
        });
        break;
      case 1: // 开始时间
        let query = this.el.nativeElement.querySelector('#times');
        query.dispatchEvent(new Event('click'));
        break;
      case 2: // 结束时间
        let query2 = this.el.nativeElement.querySelector('#timesEnd');
        query2.dispatchEvent(new Event('click'));
        break;
      case 3:
        this.requestData.startTime = this.serachData[1].value2;
        this.requestData.endTime = this.serachData[2].value2;
        console.log(this.requestData);
        this.HttpAll(this.requestData);
        break
      default:
        break;
    }
  }


  // 数据分页
  PageIndexChange(number): void{
    // 打印当前页码
    console.log(number);
    this.requestData.pageNo = number;
    this.HttpAll(this.requestData);
  }

  // 请求超限率综合统计
  HttpAll(data: any): void{
    this.http.overRateReport(data).subscribe( value => {

      //
      if(value.body.code === 0 ){
        console.log(value.body.data);
        this.listOfData = [];
        for(let i=0;i<value.body.data.length;i++){
          // @ts-ignore
          this.listOfData.push(value.body.data[i]);
          // this.total = value.body.data.totalRows;
          let a={
            textStyle: {
              width: 50
            },
            value: value.body.data[i].stationName
          }
          this.MonitoringPoints.push(a);
          this.OverrunRate.push(value.body.data[i].oln);
        }
        console.log(this.MonitoringPoints);
      }
      setTimeout(() => {
        const a = this.el.nativeElement.querySelector('#cons0');
        const ec = echars as any;
        const init = ec.init(a);
        init.setOption(this.option);
      }, 2000);


    });
  }

}
