import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';

@Component({
  selector: 'app-command-index',
  templateUrl: './command-index.component.html',
  styleUrls: ['./command-index.component.css']
})
export class CommandIndexComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  tabUrl = [
    {src: '/command/runMonitoring'},
    {src: '/command/sourceIndex'},
    {src: '/command/commandIndex'},
    {src: '/queryAll/index'},
  ];

  liData = [
    {text: '视频卡口', check: false, number: '28'},
    {text: '源头企业', check: false, number: '28'},
    {text: '非现场检测点', check: false, number: '28'},
    {text: '治超检测站', check: false, number: '28'},
    {text: '执法人员', check: false, number: '28'},
    {text: '执法车辆', check: false, number: '28'},
  ];

  cardData = [
    {id: '粤HB8982', name: '超限嫌疑车', class: 1,
      list: [
        {span: '报警时间：', p: '2020-09-27 11:40:57'},
        {span: '检测点：', p: 'G106K1612安定检测点'},
        {span: '方向：', p: '平江往浏阳'},
        {span: '总重：', p: '55100'},
        {span: '超限量：', p: '6100'},
        {span: '轴数：', p: '6'},
        {span: '超限率：', p: '12.45%'}
      ]
    },
    {id: '粤HB8982', name: '超限嫌疑车', class: 2,
      list: [
        {span: '报警时间：', p: '2020-09-27 11:40:57'},
        {span: '检测点：', p: 'G106K1612安定检测点'},
        {span: '方向：', p: '平江往浏阳'},
        {span: '总重：', p: '55100'},
        {span: '超限量：', p: '6100'},
        {span: '轴数：', p: '6'},
        {span: '超限率：', p: '12.45%'}
      ]
    }
  ];

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

  onJump(index): void{// 跳转
    this.route.navigate(['/command/basicInformation']);
  }

  onTabJump(index): void {
    this.route.navigate([this.tabUrl[index].src]);
  }

}
