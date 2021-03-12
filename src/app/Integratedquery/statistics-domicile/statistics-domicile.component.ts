import {Component, ElementRef, OnInit} from '@angular/core';
import {OverrunrateConstans} from '../constans/queryConst';
import * as $ from 'jquery';
import * as echars from 'echarts';
import {MatDialog} from '@angular/material/dialog';
import {SiteSelectionComponent} from '../site-selection/site-selection.component';
import {PickerController} from '@ionic/angular';
import {HttpServiceService} from "../../http/http-service.service";
import {GetProvinceCodeBean} from "../../http/HttpBean/GetProvinceCodeBean";

@Component({
  selector: 'app-statistics-domicile',
  templateUrl: './statistics-domicile.component.html',
  styleUrls: ['./statistics-domicile.component.css']
})
export class StatisticsDomicileComponent implements OnInit {

  serachData = OverrunrateConstans;
  option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      position(point, params, dom, rect, size): void {
        dom.style.transform = 'translateZ(0)';
      }
    },

    legend: {
      textStyle: {
        color: 'rgba(251, 248, 248, 1)',
        fontSize: 10
      },
      orient: 'horizontal',
      left: 10,
      // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '搜索引擎1', '搜索引擎2', '搜索引擎3']
      data: []
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        roundCap: true,
        avoidLabelOverlap: false,
        top: 120,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          // {value: 335,
          //   name: '直接访问',},
        ]
      }
    ]
  };
  option2 = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      position(point, params, dom, rect, size): void {
        dom.style.transform = 'translateZ(0)';
      }
    },

    legend: {
      textStyle: {
        color: 'rgba(251, 248, 248, 1)',
        fontSize: 10
      },
      orient: 'horizontal',
      left: 10,
      data: []
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        roundCap: true,
        avoidLabelOverlap: false,
        top: 120,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          // {value: 335,
          //   name: '直接访问',
          //   itemStyle: {
          //     normal: {
          //       color: '#F94670',
          //     }
          //   }},
        ]
      }
    ]
  };

  barStyle = {
    width: 300,
    height: 300
  };

  defaultColumnOptions = [
    [
      {name: "",code: ""}
    ]
  ];
  City: GetProvinceCodeBean[] = [];
  city: any = '全国';

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
    this.getProvinceCode();

    const a = this.el.nativeElement.querySelector('#cons');
    const b = this.el.nativeElement.querySelector('#cons1');
    this.barStyle.width = $(window).width() - 30;
    // this.barStyle.height =  $(window).height();
    setTimeout(() => {
      const ec = echars as any;
      const init = ec.init(a);
      init.setOption(this.option);

      const ecb = echars as any;
      const initb = ecb.init(b);
      initb.setOption(this.option);
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

  // tslint:disable-next-line:typedef
  async openPicker( numColumns = 1, numOptions = this.defaultColumnOptions[0].length, columnOptions = this.defaultColumnOptions) {
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确认',
          handler: (value) => {
            const a = JSON.stringify(value);
            const b = JSON.parse(a);
            this.city = b.col_0.text;
            console.log(`Got Value ${a}`);
            this.requestData.provinceCode= b.col_0.value;
            console.log("当前省份编码："+b.col_0.value);
          }
        }
      ]
    });

    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions): any{
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col_${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions): any {
    const options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions].name,
        value: columnOptions[columnIndex][i % numOptions].code
      });
    }

    return options;
  }
  // 请求超限率综合统计
  HttpAll(data: any): void{
    this.http.carNativeReport(data).subscribe( value => {

      //
      if(value.body.code === 0 ){
        this.option.legend.data = [];
        this.option.series[0].data = [];
        this.option2.legend.data = [];
        this.option2.series[0].data = [];
        value.body.data.passPercentList.forEach((e , i)=>{
          this.option.legend.data.push(e.name);
          const  a = {value: 310, name: '邮件营销'};
          a.value = e.passNum;
          a.name= e.name;
          this.option.series[0].data.push(a);
        });

        value.body.data.overPercentList.forEach((e,i)=>{
          this.option2.legend.data.push(e.name);
          const  a = {value: 310, name: '邮件营销'};
          a.value = e.overNum;
          a.name= e.name;
          this.option2.series[0].data.push(a);
        });

        console.log(this.option.legend.data);
      }
      const a = this.el.nativeElement.querySelector('#cons');
      const b = this.el.nativeElement.querySelector('#cons1');
      setTimeout(() => {
        const ec = echars as any;
        const init = ec.init(a);
        init.setOption(this.option);

        const ecb = echars as any;
        const initb = ecb.init(b);
        initb.setOption(this.option2);
      }, 1000);


    });
  }
  // 获取省编码
  getProvinceCode(): void{
    this.http.getProvinceCode(null).subscribe( value => {
      if(value.body.code ===0){
        this.defaultColumnOptions[0] = [];
        value.body.data.forEach((e,i)=>{
          const  a ={name: "",code: ""};
          a.name = e.provinceName;
          a.code = e.provinceCode;
          this.defaultColumnOptions[0].push(a);
          this.City.push(e);
        })
      }
    });
  }

}
