import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

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
  ) { }

  isShow = [true, false, false, false];

  tableData = [
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
  ];

  jumpUrl = [
    {src: '/command/runMonitoring'},
    {src: '/command/runDiagram'},
  ];

  pass_rate = 1240;
  total = 2000;

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
    this.route.navigate(['/command/carDetails']);
  }
}
