import {Component, ElementRef, OnInit} from '@angular/core';
import {illtegalDetailsTitle} from "../constans/queryConst";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-illegal-details',
  templateUrl: './illegal-details.component.html',
  styleUrls: ['./illegal-details.component.css']
})
export class IllegalDetailsComponent implements OnInit {
  name = illtegalDetailsTitle; // 头部名称


  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 2000,
    },
    loop: true
  };

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
