import { Component, OnInit } from '@angular/core';
import {AllQueryConst} from '../../constans/BaseConst';
import {queryConstans, statisticsConstans} from '../constans/queryConst';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';

@Component({
  selector: 'app-statistics-index',
  templateUrl: './statistics-index.component.html',
  styleUrls: ['./statistics-index.component.css']
})
export class StatisticsIndexComponent implements OnInit {

  name = AllQueryConst.lable5;
  datas = statisticsConstans;

  Actived = 0;

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

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

  // 选择
  segmentChanged(event): void{
    console.log(event.detail.value);
    switch (event.detail.value){
      case '0':
        console.log('Segment changed', 0);
        this.route.navigate(['/queryAll/StatisticsIndex/Overrunrate']);
        break;
      case '1':
        console.log('Segment changed', 1);
        // this.route.navigate(['/queryAll/queryIndex/enterprise']);
        break;
      case '2':
        // this.route.navigate(['/queryAll/queryIndex/vehicle']);
        break;
    }

  }
}
