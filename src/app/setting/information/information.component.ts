import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
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
}
