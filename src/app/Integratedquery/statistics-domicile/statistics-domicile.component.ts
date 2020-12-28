import {Component, ElementRef, OnInit} from '@angular/core';
import {OverrunrateConstans} from "../constans/queryConst";
import * as $ from "jquery";
import * as echars from "echarts";

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
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },

    legend: {
      textStyle: {
        color: "rgba(251, 248, 248, 1)",
        fontSize: 10
      },
      orient: 'horizontal',
      left: 10,
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎','搜索引擎1','搜索引擎2','搜索引擎3']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        top: 20,
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
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'},
          {value: 1548, name: '搜索引擎1'},
          {value: 1548, name: '搜索引擎2'},
          {value: 1548, name: '搜索引擎3'}
        ]
      }
    ]
  };

  barStyle = {
    width: 300,
    height: 300
  }


  constructor(
    private el: ElementRef,
  ) {


  }


  ngOnInit(): void {
    const  a=this.el.nativeElement.querySelector("#cons");
    const  b=this.el.nativeElement.querySelector("#cons1");
    this.barStyle.width =  $(window).width()-30;
    // this.barStyle.height =  $(window).height();
    setTimeout(()=>{
      const ec = echars as any;
      let init = ec.init(a);
      init.setOption(this.option)

      const ecb = echars as any;
      let initb = ecb.init(b);
      initb.setOption(this.option)
    }, 1000)

  }

}
