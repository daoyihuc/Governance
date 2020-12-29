import {Component, ElementRef, OnInit} from '@angular/core';
import {OverrunrateConstans} from '../constans/queryConst';
import * as $ from 'jquery';
import * as echars from 'echarts';

@Component({
  selector: 'app-statistics-over-limit',
  templateUrl: './statistics-over-limit.component.html',
  styleUrls: ['./statistics-over-limit.component.css']
})
export class StatisticsOverLimitComponent implements OnInit {

  serachData = OverrunrateConstans;
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
  barStyle = {
    width: 300,
    height: 300
  };

  listOfData = [
    {
      key: '1',
      name: '湘YA0089',
      age: '金洲细线菁华铺非现场检测点',
      address: '100',
      i1: '1',
      i2: '1',
      i3: '1',
      i4: '1',
    },
    {
      key: '2',
      name: '湘YA0089',
      age: '金洲细线菁华铺非现场检测点',
      address: '100',
      i1: '1',
      i2: '1',
      i3: '1',
      i4: '1',
    },
    {
      key: '3',
      name: '湘YA0089',
      age: '金洲细线菁华铺非现场检测点',
      address: '100',
      i1: '1',
      i2: '1',
      i3: '1',
      i4: '1',
    }
  ];


  constructor(
    private el: ElementRef,
  ) {


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

  }


}
