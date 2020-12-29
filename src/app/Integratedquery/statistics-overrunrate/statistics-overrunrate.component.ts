import {Component, ElementRef, OnInit} from '@angular/core';
// @ts-ignore
import {OverrunrateConstans} from '../constans/queryConst';

import * as echars from 'echarts';
import * as $ from 'jquery';

@Component({
  selector: 'app-statistics-overrunrate',
  templateUrl: './statistics-overrunrate.component.html',
  styleUrls: ['./statistics-overrunrate.component.css']
})
export class StatisticsOverrunrateComponent implements OnInit {

  serachData = OverrunrateConstans;
  option = {
    color: ['#3398DB'],
    tooltip: {
      show: false,
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
      address: '100'
    },
    {
      key: '2',
      name: '湘YA0089',
      age: '金洲细线菁华铺非现场检测点',
      address: '100'
    },
    {
      key: '3',
      name: '湘YA0089',
      age: '金洲细线菁华铺非现场检测点',
      address: '100'
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
      let init = ec.init(a);
      init.setOption(this.option);
    }, 1000);

  }


}
