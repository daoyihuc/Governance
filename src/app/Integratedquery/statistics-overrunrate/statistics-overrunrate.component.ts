import { Component, OnInit } from '@angular/core';
import {OperationConstans, OverrunrateConstans} from '../constans/queryConst';
import * as echars from 'echarts';

@Component({
  selector: 'app-statistics-overrunrate',
  templateUrl: './statistics-overrunrate.component.html',
  styleUrls: ['./statistics-overrunrate.component.css']
})
export class StatisticsOverrunrateComponent implements OnInit {

  serachData = OverrunrateConstans;
  // declare da = echars.init();
  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)'
      }
    }]
  };


  constructor() { }

  ngOnInit(): void {
  }

}
