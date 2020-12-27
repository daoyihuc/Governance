import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-run-diagram',
  templateUrl: './run-diagram.component.html',
  styleUrls: ['./run-diagram.component.scss']
})
export class RunDiagramComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  isShow = [false, false, false, false];

  tableData = [
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
    {name: '99.6%', car: '湘A9FJ76' },
  ];

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

  onShow(index): void {
    this.isShow[index] = !this.isShow[index];
  }

  onJump(index): void {
    this.route.navigate([this.jumpUrl[index].src]);
  }
}
