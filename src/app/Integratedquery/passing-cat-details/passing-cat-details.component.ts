import {Component, ElementRef, OnInit} from '@angular/core';
import {Baseinterface} from "../../interface/baseinterface";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import {passingCatDetailsTitle} from "../constans/queryConst";

@Component({
  selector: 'app-passing-cat-details',
  templateUrl: './passing-cat-details.component.html',
  styleUrls: ['./passing-cat-details.component.css']
})
export class PassingCatDetailsComponent implements OnInit, Baseinterface {

  name = passingCatDetailsTitle; // 头部名称

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private el: ElementRef,

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
