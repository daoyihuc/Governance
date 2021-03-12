import {Component, ElementRef, OnInit} from '@angular/core';
import {OverrunrateConstans} from '../constans/queryConst';
import * as $ from 'jquery';
import * as echars from 'echarts';
import {MatDialog} from '@angular/material/dialog';
import {SiteSelectionComponent} from '../site-selection/site-selection.component';
import {PickerController} from "@ionic/angular";
import {HttpServiceService} from "../../http/http-service.service";

@Component({
  selector: 'app-statistics-over-limit',
  templateUrl: './statistics-over-limit.component.html',
  styleUrls: ['./statistics-over-limit.component.css']
})
export class StatisticsOverLimitComponent implements OnInit {

  serachData = OverrunrateConstans;

  axLexArr = [6];
  timeArr = [6];

  option = {
    color: ['#3398DB'],
    tooltip: {
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
        data: ['00-04', '04-08', '08-12', '12-16', '16-20','20-24'],
        axisTick: {
          alignWithLabel: true
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
        name: '超限量',
        type: 'bar',
        barWidth: '60%',
        data: this.timeArr
      }
    ]
  };
  option1 = {
    color: ['#3398DB'],
    tooltip: {
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
        data: ['2轴', '3轴', '4轴', '5轴', '6轴'],
        axisTick: {
          alignWithLabel: true
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
        name: '超限量',
        type: 'bar',
        barWidth: '60%',
        data: this.axLexArr
      }
    ]
  };
  barStyle = {
    width: 300,
    height: 300
  };

  listOfData1 = [
    {
      "axle2": 0,
      "axle3": 0,
      "axle4": 0,
      "axle5": 0,
      "axle6": 0,
      "stationName": "string"
    }
  ];

  listOfData2 = [
    {
      "stationName": "string",
      "time1": 0,
      "time2": 0,
      "time3": 0,
      "time4": 0,
      "time5": 0,
      "time6": 0
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

  minTime = new Date().toISOString(); // 最小时间
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
    setTimeout(() => {
      const ec = echars as any;
      const init = ec.init(a);
      init.setOption(this.option);
    }, 1000);

    // 超限量/辆（分轴统计）
    const a1 = this.el.nativeElement.querySelector('#cons1');
    this.barStyle.width = $(window).width() - 30;
    // this.barStyle.height =  $(window).height();
    setTimeout(() => {
      const ec1 = echars as any;
      const init1 = ec1.init(a1);
      init1.setOption(this.option1);
    }, 1000);

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

  // 请求超限率综合统计
  HttpAll(data: any): void{
    this.http.overNumReport(data).subscribe( value => {

      //
      if(value.body.code === 0 ){
        console.log(value.body.data);
        this.listOfData1 = [];
        this.listOfData2 = [];
        for(let i=0;i<value.body.data.byAxleList.length;i++){
          if(value.body.data.byAxleList[i].stationName != "总计"){
            // @ts-ignore
            this.listOfData1.push(value.body.data.byAxleList[i]);
          }else{
            this.axLexArr[0]  = value.body.data.byAxleList[i].axle2;
            this.axLexArr[1]  =  value.body.data.byAxleList[i].axle3;
            this.axLexArr[2]  =  value.body.data.byAxleList[i].axle4;
            this.axLexArr[3]  =  value.body.data.byAxleList[i].axle5;
            this.axLexArr[4]  =  value.body.data.byAxleList[i].axle6;
          }

        }


        for(let i=0;i<value.body.data.byTimeList.length;i++){
          if(value.body.data.byAxleList[i].stationName != "总计"){
            // @ts-ignore
            this.listOfData2.push(value.body.data.byTimeList[i]);
          }else{
            this.timeArr[0] = value.body.data.byTimeList[i].time1;
            this.timeArr[1] =  value.body.data.byTimeList[i].time2;
            this.timeArr[2] =  value.body.data.byTimeList[i].time3;;
            this.timeArr[3] = value.body.data.byTimeList[i].time4;
            this.timeArr[4] = value.body.data.byTimeList[i].time5;
            this.timeArr[5] = value.body.data.byTimeList[i].time6;
          }

        }
      }

      const a = this.el.nativeElement.querySelector('#cons0');
      this.barStyle.width = $(window).width() - 30;
      // this.barStyle.height =  $(window).height();
      setTimeout(() => {
        const ec = echars as any;
        const init = ec.init(a);
        init.setOption(this.option);
      }, 2000);

      // 超限量/辆（分轴统计）
      const a1 = this.el.nativeElement.querySelector('#cons1');
      this.barStyle.width = $(window).width() - 30;
      // this.barStyle.height =  $(window).height();
      setTimeout(() => {
        const ec1 = echars as any;
        const init1 = ec1.init(a1);
        init1.setOption(this.option1);
      }, 2000);



    });
  }


}
