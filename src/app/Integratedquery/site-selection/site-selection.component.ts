import {Component, OnInit} from '@angular/core';
import {Baseinterface} from '../../interface/baseinterface';
import {WindowService} from '../../utils/window.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../http/http-service.service';

@Component({
  selector: 'app-site-selection',
  templateUrl: './site-selection.component.html',
  styleUrls: ['./site-selection.component.css']
})
/*
 *@param 站点选择
*/
export class SiteSelectionComponent implements OnInit, Baseinterface {


  name = '站点选择';

  // 数据监测点
  ItemData: any = [
    {
      id: 0,
      name: '非现场检测点',
      childsItem: [
        // {
        //   id: 1,
        //   name: '夏铎铺',
        //   check: false,
        //   click: false,
        // }
      ],
      check: false,
      click: false,
    },
    {
      id: 1,
      name: '精检测点',
      childsItem: [
        // {
        //   id: 1,
        //   name: '养鱼塘超限检测站',
        //   check: false,
        //   click: false,
        // }
      ],
      check: false,
      click: false,
    },
  ];

  // 已选择站点
  ItemDataSelect: any =[
    // {
    //   id: 1,
    //   name: '夏铎铺',
    //   check: false,
    //   click: false,
    // }
  ]

  constructor(
    private windowUntils: WindowService,
    private dialog: MatDialogRef<SiteSelectionComponent>,
    private http: HttpServiceService, // http
  ) {
  }

  ngOnInit(): void {
    this.initCheck(0);
    this.HttpSite();
  }

  // 初始化选择
  initCheck(index): void {
    for (let i = 0; i < this.ItemData.length; i++) {

      for (let j = 0; j < this.ItemData[i].childsItem.length; j++) {
        if (index === i) {
          if (this.ItemData[i].check) {
            this.ItemData[i].childsItem[j].check = true;
          }
        }

      }
    }
  }

  // child输出
  initChild(i, j): void {
    console.log(this.ItemData[i].childsItem[j].name, this.ItemData[i].childsItem[j].check);
    this.ItemDataSelect = [];
    for(let u=0;u<this.ItemData.length;u++){
      console.log(this.ItemData.length);
      if(this.ItemData[u].check){
        console.log(this.ItemData[u].childsItem.length);
        for(let o=0;o<this.ItemData[u].childsItem.length;o++){
          if(this.ItemData[u].childsItem[o].check){
            console.log(this.ItemData[u].childsItem[o].name);
            this.ItemDataSelect.push(this.ItemData[u].childsItem[o]);
          }

        }
      }
    }
    console.log(this.ItemData);
    console.log(this.ItemDataSelect);
  }

  onBack(): void {
    // 返回站点选择
    this.dialog.close({data: this.ItemDataSelect});
  }

  onHome(): void {
    // this.route.navigate(['/home']);
  }

  onSetting(): void { // 个人中心
    // this.route.navigate(['/setting']);
  }

  // httpSite
  HttpSite(): void {
    this.http.tweighInit(null).subscribe(value => {


      for (let i = 0; i < value.body.data.length; i++) {
        const a = {
          id: '',
          name: '',
          check: false,
          click: false,
        };
        a.id = value.body.data[i].weighnum; // 编号
        a.name = value.body.data[i].weighname; // 名称
        if ( value.body.data[i].weighType === '0'){
          this.ItemData[0].childsItem.push(a); // 非现场
        }else{
          this.ItemData[1].childsItem.push(a); // 精检测
        }
      }

    });
  }
}


