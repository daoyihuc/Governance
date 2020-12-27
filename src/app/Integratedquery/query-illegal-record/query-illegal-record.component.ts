import {Component, ElementRef, OnInit} from '@angular/core';
import {IllegalRecordConstans, IllegalRecordName, PassingCarConstans, passingCarName} from "../constans/queryConst";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-query-illegal-record',
  templateUrl: './query-illegal-record.component.html',
  styleUrls: ['./query-illegal-record.component.css']
})
export class QueryIllegalRecordComponent implements OnInit {

  listOfData = [
    {
      key: '1',
      name: '湘YA0089',
      age: '金洲细线菁华铺非现场检测点',
      address: '100'
    },
    {
      key: '2',
      name: '湘YA0089',
      age: '金洲细线菁华铺非现场检测点',
      address: '100'
    },
    {
      key: '3',
      name: '湘YA0089',
      age: '金洲细线菁华铺非现场检测点',
      address: '100'
    }
  ];
  name = IllegalRecordName;
  serachData = IllegalRecordConstans;

  minTime = new Date().toISOString(); // 最小时间
  customPickerOptionsStart: any; //开始时间设置
  customPickerOptionsEnd: any; //结束时间设置

  // 绑定时间
  ValueTimeStart: any;
  ValueTimeEnd: any;

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private el: ElementRef,
  ) {
    this.customPickerOptionsStart = {
      buttons: [{
        text: '取消',
        handler: (a) => {
          console.log('Clicked save'+JSON.stringify(a));
          let b=JSON.stringify(a);
          const c=JSON.parse(b);
          const year=c.year.value;
          const month=c.month.value;
          const day=c.day.value;
          const hour=c.hour.value;
          const minute=c.minute.value;
          this.ValueTimeStart = year+month+day+hour+minute;
          // this.InputDatas[2].value = this.ValueTime;
          return a;
        }
      }, {
        text: '确定',
        handler: (a) => {
          let b=JSON.stringify(a);
          const c=JSON.parse(b);
          const year=c.year.value;
          const month=c.month.value;
          const day=c.day.value;
          const hour=c.hour.value;
          const minute=c.minute.value;
          this.ValueTimeStart = year+'年'+month+'月'+day+'日'+hour+'点'+minute;
          this.serachData[2].value = this.ValueTimeStart;
          console.log('Clicked Log. Do not Dismiss.'+this.ValueTimeStart);
          return a;
        }
      }]
    }
    this.customPickerOptionsEnd = {
      buttons: [{
        text: '取消',
        handler: (a) => {
          console.log('Clicked save'+JSON.stringify(a));
          let b=JSON.stringify(a);
          const c=JSON.parse(b);
          const year=c.year.value;
          const month=c.month.value;
          const day=c.day.value;
          const hour=c.hour.value;
          const minute=c.minute.value;
          this.ValueTimeEnd = year+month+day+hour+minute;
          // this.InputDatas[2].value = this.ValueTime;
          return a;
        }
      }, {
        text: '确定',
        handler: (a) => {
          let b=JSON.stringify(a);
          const c=JSON.parse(b);
          const year=c.year.value;
          const month=c.month.value;
          const day=c.day.value;
          const hour=c.hour.value;
          const minute=c.minute.value;
          this.ValueTimeEnd = year+'年'+month+'月'+day+'日'+hour+'点'+minute;
          this.serachData[3].value = this.ValueTimeEnd;
          console.log('Clicked Log. Do not Dismiss.'+this.ValueTimeEnd);
          return a;
        }
      }]
    }
  }

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

  // 点击事件
  onClick(id,index,): void{
    switch (id){
      case 0:

        break;
      case 1:

        break;
      case 2:
        let query = this.el.nativeElement.querySelector('#times');
        query.dispatchEvent(new Event('click'));
        break;
      case 3:
        let query2 = this.el.nativeElement.querySelector('#timesEnd');
        query2.dispatchEvent(new Event('click'));
        break;
      case 4:
        break;
    }
  }
   // 查看详情
  showDetails(data: any): void{
    this.route.navigate(['queryAll/IllegalDetails'])
  }

}
