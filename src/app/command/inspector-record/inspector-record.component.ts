import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';
import * as $ from 'jquery';
import {HttpServiceService} from '../../http/http-service.service';
import {ToastController} from '@ionic/angular';
import {ToastService} from '../../utils/toast.service';
import {getResourceListBean, getResourceListBeanData} from "../../http/HttpBean/getResourceListBean";

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
    private http: HttpServiceService,
    private toast: ToastService,
  ) { }

  levels:  getResourceListBean[] = [

  ];

  ngOnInit(): void {
    // 获取列表
    // @ts-ignore
    this.getList();
  }

  accordion(index): void{
    console.log("id:",this.levels[index].id);
    this.route.navigate(['/command/supervisionInformation',{id: this.levels[index].id}]);
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

  // 获取列表
  getList(): void{
    // @ts-ignore
    this.http.superviseRecord().subscribe(value => {
      console.log(value);
      if (value.body.code === 0){
        console.log(value);
       value.body.data.forEach((e,i)=>{
          this.levels.push(e);
        });
      }else{
        this.toast.presentToast(value.body.message);
      }
    });
  }
}
