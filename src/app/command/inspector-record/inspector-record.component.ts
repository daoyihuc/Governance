import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-inspector-record',
  templateUrl: './inspector-record.component.html',
  styleUrls: ['./inspector-record.component.scss']
})
export class InspectorRecordComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  levels = [
    { time : '2020-07-12 16:40:22', name: '宁乡县花明楼镇三江石灰石矿'},
    { time : '2020-07-12 16:40:22', name: '宁乡县花明楼镇三江石灰石矿'},
  ];

  ngOnInit(): void {
  }

  accordion(index): void{
    console.log(index);
    this.route.navigate(['/command/carDetails']);
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

  onClose(): void {
    this.windowUntils.onBack();
  }

}
