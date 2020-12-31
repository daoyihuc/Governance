import {Component, OnInit} from '@angular/core';
import {Baseinterface} from '../../interface/baseinterface';
import {WindowService} from '../../utils/window.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

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
        {
          id: 1,
          name: '夏铎铺',
          check: false,
          click: false,
        },
        {
          id: 1,
          name: '金唐公路',
          check: false,
          click: false,
        },
        {
          id: 1,
          name: '金洲西线菁华铺非现场检测点',
          check: false,
          click: false,
        },
        {
          id: 1,
          name: 'S209大成桥非现场检测点',
          check: false,
          click: false,
        }
      ],
      check: false,
      click: false,
    },
    {
      id: 1,
      name: '精检测点',
      childsItem: [
        {
          id: 1,
          name: '养鱼塘超限检测站',
          check: false,
          click: false,
        },
        {
          id: 1,
          name: '菁华铺超限检测站',
          check: false,
          click: false,
        },
        {
          id: 1,
          name: '横市超限检测站',
          check: false,
          click: false,
        },
        {
          id: 1,
          name: '横市超限检测站',
          check: false,
          click: false,
        },
        {
          id: 1,
          name: '横市超限检测站',
          check: false,
          click: false,
        }
      ],
      check: false,
      click: false,
    },
  ];

  constructor(
    private windowUntils: WindowService,
    private dialog: MatDialogRef<SiteSelectionComponent>,
  ) {
  }

  ngOnInit(): void {
    this.initCheck(0);
  }

  // 初始化选择
  initCheck(index): void {
    for (let i = 0; i < this.ItemData.length; i++) {

      for (let j = 0; j < this.ItemData[i].childsItem.length; j++) {
        if (index === i){
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
  }

  onBack(): void {
    // 返回站点选择
    this.dialog.close({da: 123});
  }

  onHome(): void {
    // this.route.navigate(['/home']);
  }

  onSetting(): void { // 个人中心
    // this.route.navigate(['/setting']);
  }
}


