import {Component, ElementRef, OnInit} from '@angular/core';
import {OverrunrateConstans} from '../constans/queryConst';
import * as $ from 'jquery';
import * as echars from 'echarts';
import {MatDialog} from '@angular/material/dialog';
import {SiteSelectionComponent} from '../site-selection/site-selection.component';
import {PickerController} from '@ionic/angular';

@Component({
  selector: 'app-statistics-domicile',
  templateUrl: './statistics-domicile.component.html',
  styleUrls: ['./statistics-domicile.component.css']
})
export class StatisticsDomicileComponent implements OnInit {

  serachData = OverrunrateConstans;
  option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      position(point, params, dom, rect, size): void {
        dom.style.transform = 'translateZ(0)';
      }
    },

    legend: {
      textStyle: {
        color: 'rgba(251, 248, 248, 1)',
        fontSize: 10
      },
      orient: 'horizontal',
      left: 10,
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '搜索引擎1', '搜索引擎2', '搜索引擎3']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        roundCap: true,
        avoidLabelOverlap: false,
        top: 20,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {value: 335,
            name: '直接访问',
            itemStyle: {
              normal: {
                color: '#F94670',
              }
            }},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'},
          {value: 1548, name: '搜索引擎1'},
          {value: 1548, name: '搜索引擎2'},
          {value: 1548, name: '搜索引擎3'}
        ]
      }
    ]
  };
  barStyle = {
    width: 300,
    height: 300
  };

  defaultColumnOptions = [
    [
      '全国',
      '河北',
      '辽宁',
      '安徽',
      '江苏',
      '湖北',
      '山西',
      '吉林',
      '广东',
    ]
  ];
  city: any = '全国';


  constructor(
    private el: ElementRef,
    private mes: MatDialog,
    private pickerController: PickerController,
  ) {


  }


  ngOnInit(): void {
    const a = this.el.nativeElement.querySelector('#cons');
    const b = this.el.nativeElement.querySelector('#cons1');
    this.barStyle.width = $(window).width() - 30;
    // this.barStyle.height =  $(window).height();
    setTimeout(() => {
      const ec = echars as any;
      const init = ec.init(a);
      init.setOption(this.option);

      const ecb = echars as any;
      const initb = ecb.init(b);
      initb.setOption(this.option);
    }, 1000);

  }

  OnClick(id, index): void{
    switch (id){
      case 0:
        const matDialogRef = this.mes.open(SiteSelectionComponent);
        matDialogRef.afterClosed().subscribe(value => {
          console.log(value);
        });
        break;
      case 1:

        break;
      case 2:

        break;
      default:
        break;
    }
  }

  // tslint:disable-next-line:typedef
  async openPicker( numColumns = 1, numOptions = 5, columnOptions = this.defaultColumnOptions) {
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确认',
          handler: (value) => {
            const a = JSON.stringify(value);
            const b = JSON.parse(a);
            this.city = b.col_0.text;
            console.log(`Got Value ${a}`);
          }
        }
      ]
    });

    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions): any{
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col_${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions): any {
    const options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      });
    }

    return options;
  }

}
