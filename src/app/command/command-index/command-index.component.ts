import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-command-index',
  templateUrl: './command-index.component.html',
  styleUrls: ['./command-index.component.css']
})
export class CommandIndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cardData = [
    {'id': '粤HB8982', 'name': '超限嫌疑车', 'class': 1,
      'list': [
        {'span': '报警时间：', 'p': '2020-09-27 11:40:57'},
        {'span': '检测点：', 'p': 'G106K1612安定检测点'},
        {'span': '方向：', 'p': '平江往浏阳'},
        {'span': '总重：', 'p': '55100'},
        {'span': '超限量：', 'p': '6100'},
        {'span': '轴数：', 'p': '6'},
        {'span': '超限率：', 'p': '12.45%'}
      ]
    },
    {'id': '粤HB8982', 'name': '超限嫌疑车', 'class': 2,
      'list': [
        {'span': '报警时间：', 'p': '2020-09-27 11:40:57'},
        {'span': '检测点：', 'p': 'G106K1612安定检测点'},
        {'span': '方向：', 'p': '平江往浏阳'},
        {'span': '总重：', 'p': '55100'},
        {'span': '超限量：', 'p': '6100'},
        {'span': '轴数：', 'p': '6'},
        {'span': '超限率：', 'p': '12.45%'}
      ]
    }
  ]

}
