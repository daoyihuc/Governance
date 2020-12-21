import { Component, OnInit } from '@angular/core';
import {Baseinterface} from '../../interface/baseinterface';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';
import { PassingCarConstans, passingCarName} from '../constans/queryConst';

@Component({
  selector: 'app-query-passing-car',
  templateUrl: './query-passing-car.component.html',
  styleUrls: ['./query-passing-car.component.css']
})
export class QueryPassingCarComponent implements OnInit, Baseinterface {

  name = passingCarName;
  serachData = PassingCarConstans;
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

}
