import { Component, OnInit } from '@angular/core';
import {BaseConst} from '../../constans/BaseConst';
import {ActivatedRoute, Router} from '@angular/router';
import {Baseinterface} from '../../interface/baseinterface';
import {WindowService} from "../../utils/window.service";
import {HttpServiceService} from "../../http/http-service.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, Baseinterface {

  datas = BaseConst ;

  tabUrl = [
    {src: '/command/runMonitoring'},
    {src: '/command/sourceIndex'},
    {src: '/command/commandIndex'},
    {src: '/queryAll/index'},
  ];
  AlarM=[];


  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private window: WindowService, // 系统服务
    private http: HttpServiceService
  ) { }

  ngOnInit(): void {
    this.Http();
    window['android'].setName("home");

  }

  onBack(): void {
    this.window.onBack();
  }
  // 路由跳转
  GoRouter(index): void{
    switch (index){
      case 0:
        this.route.navigate(['/command/runMonitoring']);
        break;
      case 1:
        this.route.navigate(['/command/sourceIndex']);
        break;
      case 2:
        this.route.navigate(['/command/commandIndex']);
        break;
      case 3: // 综合search
        this.route.navigate(['/queryAll']);

        break;
      case 4: // 信息录入
        this.route.navigate(['/home/entry']);
        break;

    }
  }

  onHome(): void {

  }

  onTabJump(index): void {
    this.route.navigate([this.tabUrl[index].src]);
  }

  onSetting(): void {
    this.route.navigate(['/setting']);
  }
  Http(): void{
    this.http.getAlarmRecordCount(null).subscribe(val =>{
      if(val.body.code===0){
        val.body.data.forEach( (item) =>{
          this.AlarM.push(item);
        })
      }
    })
  }


}
