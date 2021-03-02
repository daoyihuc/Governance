import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WindowService} from "../../utils/window.service";
import {Baseinterface} from "../../interface/baseinterface";
import {HttpServiceService} from "../../http/http-service.service";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit,Baseinterface {
  name = '版本信息';
  constructor(
    private route: Router,
    private windowUntils: WindowService,
    private http: HttpServiceService,
  ) { }


  lists = [
    {name: '系统名称', text: '宁乡市科技治超综合执法应用平台'},
    {name: '版本号', text: '版本WXJTV1.0'},
    {name: '版权所有', text: '\n' +
        '                                Copyright ©1996-2025 Hunan \n' +
        'Wangxun Electronics Technology \n' +
        'Corporation, All Rights Reserved\n' +
        '                            '},
    {name: '技术支持', text: '\n' +
        '                                湖南网讯电子科技有限公司\n' +
        'TEL： 0731-88889996\n' +
        '                            '}
  ];

  ngOnInit(): void {
    this.HTTP(null);
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
  HTTP(data): void{
    this.http.getSystemInfo(data).subscribe( value => {

      if(value.body.code === 0){

        this.lists[0].text = value.body.data.systemName;
        this.lists[1].text = value.body.data.version;
        this.lists[2].text = value.body.data.verOwner[0];
        this.lists[3].text = value.body.data.companyName+"\n"+value.body.data.tel;
      }else {
      }
    });
  }
}
