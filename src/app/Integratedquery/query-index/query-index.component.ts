import { Component, OnInit } from '@angular/core';
import {Baseinterface} from '../../interface/baseinterface';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';
import {AllQueryConst} from '../../constans/BaseConst';
import {queryConstans} from '../constans/queryConst';

@Component({
  selector: 'app-query-index',
  templateUrl: './query-index.component.html',
  styleUrls: ['./query-index.component.css']
})
export class QueryIndexComponent implements OnInit, Baseinterface {

  name = AllQueryConst.lable1;
  datas = queryConstans;

  Actived = 0;

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  ngOnInit(): void {
  }

  onBack(): void {
    // this.windowUntils.onBack();
    this.route.navigate(['/queryAll']);
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
        this.route.navigate(['/queryAll/queryIndex/operation']);
        break;
      case '1':
        console.log('Segment changed', 1);
        this.route.navigate(['/queryAll/queryIndex/enterprise']);
        break;
      case '2':
        this.route.navigate(['/queryAll/queryIndex/vehicle']);
        break;
    }

  }

}
