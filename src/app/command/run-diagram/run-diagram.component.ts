import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import {HttpServiceService} from "../../http/http-service.service";
import * as $ from "jquery";
import * as echars from 'echarts';
import {StationCarPassBean, StationCarPassBeanData} from "../../http/HttpBean/StationCarPassBean";
import {
  QueryTopOLTruckByUnitCodeBean,
  QueryTopOLTruckByUnitCodeBeanData
} from "../../http/HttpBean/QueryTopOLTruckByUnitCodeBean";

@Component({
  selector: 'app-run-diagram',
  templateUrl: './run-diagram.component.html',
  styleUrls: ['./run-diagram.component.scss']
})
export class RunDiagramComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService, // http
    private el: ElementRef,
  ) { }

  isShow = [true, true, true, true];

  tableData1: StationCarPassBean[] = [];
  tableData2: QueryTopOLTruckByUnitCodeBean[] = [];

  jumpUrl = [
    {src: '/command/runMonitoring'},
    {src: '/command/runDiagram'},
  ];

  requestData = {
    days: "7",
  };

  pass_rate = 1240;
  Over_limit = 0;
  Over_rate: string = "0";
  total = this.pass_rate + this.pass_rate * 0.8;

  EChartOption = {
    series: [
      {
        type: 'pie', // 图形类型
        radius: ['85%', '100%'], // 图形宽度
        roundCap: true,
        label: {// 字的位置
          show: true,
          position: 'center',
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: this.pass_rate, // 需要显示的数据
            name: this.pass_rate,
            label: {// 字
              formatter: [
                '{a|' + this.pass_rate + '}'
              ].join('\n'),
              rich: {
                a: {
                  color: '#ffffff',
                  fontSize: 12,
                  backgroundColor: 'rgba(84, 129, 220, 0.2)',
                  borderRadius: 50,
                  height: 45,
                  width: 45,
                },
              }
            },
            itemStyle: {
              normal: {
                color: '#F94670',
              }
            }
          },
          {
            value: this.total - this.pass_rate,
            // 不需要显示的数据，颜色设置成和背景一样
            itemStyle: {
              normal: {
                color: 'rgba(84, 129, 220, 0.2)'
              }
            }
          }
        ]
      },
    ]
  };

  xData = ['09.15', '09.16', '09.17', '09.18', '09.19', '09.20', '09.21'];
  yData = [120, 200, 150, 80, 70, 110, 130];

  EChartOptionTwo = {
    xAxis: {
      type: 'category',
      data: this.xData
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    series: [{
      data: this.yData,
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      label: {
        normal: {
          show: true,
          position: 'top',
          color : "#fff"
        }
      },
      lineStyle: {
        color: '#F94670',
        width: 1,
        type: 'solid'
      },
      itemStyle: {
        borderWidth: 3,
        color: '#fff'
      }
    }]
  };

  ngOnInit(): void {
    this.selectGcllAndCzll();
    this.stationCarPass();
    this.queryTopOLTruckByUnitCode();
    this.queryPassNDaysOL(this.requestData);
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

  onShow(index): void {
    this.isShow[index] = !this.isShow[index];
  }

  onJump(index): void {
    this.route.navigate([this.jumpUrl[index].src]);
  }

  onDetails(index): void {
    this.route.navigate(['/command/carDetails',{id: this.tableData2[index].id}]);
  }

  // 今日过车统计
  selectGcllAndCzll(): void{
    this.http.selectGcllAndCzll(null).subscribe( value => {
      if(value.body.code === 0){
        this.pass_rate = value.body.data.czll;
        this.Over_limit = value.body.data.gcll;
        this.Over_rate = (this.pass_rate/this.Over_limit*100).toFixed(2);
        this.EChartOption.series[0].data[0].value = this.pass_rate;
        this.EChartOption.series[0].data[0].name = this.pass_rate;
        this.EChartOption.series[0].data[0].label.formatter = [
          '{a|' + this.pass_rate + '}'
        ].join('\n');
        this.initEchars();
      }
    })
  }

  initEchars(): void{
    // 超限量/辆（分轴统计）
    const a1 = this.el.nativeElement.querySelector('#cons0');
    // this.barStyle.height =  $(window).height();
    setTimeout(() => {
      const ec1 = echars as any;
      const init1 = ec1.init(a1);
      init1.setOption(this.EChartOption);
    }, 1000);
  }

  // 图表分析-非现场检测点超限率排名
  stationCarPass(): void{
    this.http.stationCarPass(null).subscribe( value => {
      if(value.body.code === 0){
        value.body.data.forEach((e,i)=>{
          this.tableData1.push(e);
        })
      }
    })
  }

  // 图标分析-超限货车排行
  queryTopOLTruckByUnitCode(): void{
    this.http.queryTopOLTruckByUnitCode(null).subscribe( value => {
      if(value.body.code === 0){
        value.body.data.forEach((e,i) => {
          this.tableData2.push(e);
        });
      }
    })
  }

  //图表分析-7天超限率统计
  queryPassNDaysOL(data): void{
    this.http.queryPassNDaysOL(data).subscribe( value => {
      if(value.body.code === 0){
        this.xData = [];
        value.body.data.dates.forEach((e,i)=>{
          this.xData.push(e);
        });
        this.yData = [];
        value.body.data.noOverLimit.forEach((e,i)=>{
          this.yData.push(e);
        });
        this.EChartOptionTwo.xAxis.data = this.xData;
        this.EChartOptionTwo.series[0].data =this.yData;
        this.initEchars1();
      }
    })
  }
  initEchars1(): void{
    // 超限量/辆（分轴统计）
    const a1 = this.el.nativeElement.querySelector('#const1');
    // this.barStyle.height =  $(window).height();
    setTimeout(() => {
      const ec1 = echars as any;
      const init1 = ec1.init(a1);
      init1.setOption(this.EChartOptionTwo);
    }, 1000);
  }


}
