import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-run-monitoring',
  templateUrl: './run-monitoring.component.html',
  styleUrls: ['./run-monitoring.component.scss']
})
export class RunMonitoringComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) {
  }

  jumpUrl = [
    {src: '/command/runMonitoring'},
    {src: '/command/runDiagram'},
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

  onJump(index): void {
    this.route.navigate([this.jumpUrl[index].src]);
  }
}
