import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Baseinterface} from "../../interface/baseinterface";
import {WindowService} from "../../utils/window.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpServiceService} from "../../http/http-service.service";
import {ToastService} from "../../utils/toast.service";
import * as $ from 'jquery';
declare var EZUIKit: any;
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, Baseinterface,AfterViewInit {

  url = "";
  decoder = [];
  AccessToken: any = sessionStorage.getItem("AccessToken");

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService,
    private toast: ToastService,
  ) {
    this.url = this.router.snapshot.paramMap.get("url");

  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.initVedio(this.url,0);
    },2000)

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
  initVedio(url,i): void{
    this.decoder =[];
    console.log(url);
    const ids = "myPlay";
    console.log("当前id："+ids);
    const de= new EZUIKit.EZUIPlayer({
      id: ids,
      autoplay: true,
      url: url,
      accessToken: this.AccessToken,
      decoderPath: './assets',
      // height: 500,
    });
    this.decoder.push(de);
  }




}
