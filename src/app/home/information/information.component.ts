import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Baseinterface} from '../../interface/baseinterface';
import {InformationConst} from '../../constans/informationConst';
import {WindowService} from '../../utils/window.service';
import {ActivatedRoute, Router} from "@angular/router";
import {HomeConstansInfo} from "../constans/HomeConstans";
import {PickerController} from "@ionic/angular";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit, Baseinterface{

  datas = InformationConst;
  InputDatas = HomeConstansInfo;
  imgsPreview = {
    header: '',
    section: '',
    footer: '',
    WeighingList: ''
  }
  minTime = new Date().toISOString(); // 最小时间
  customPickerOptions: any;

  // 绑定时间
  ValueTime; any;

  defaultColumnOptions = [
    [
      'Dog',
      'Cat',
      'Bird',
      'Lizard',
      'Chinchilla'
    ]
  ]

  // 组件申明
  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private el: ElementRef,
    private pickerController: PickerController,
  ) {

    this.customPickerOptions = {
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
          this.ValueTime = year+month+day+hour+minute;
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
          this.ValueTime = year+'年'+month+'月'+day+'日'+hour+'点'+minute;
          this.InputDatas[2].value = this.ValueTime;
          console.log('Clicked Log. Do not Dismiss.'+this.ValueTime);
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

  // 文件上传
  onSelectFile(envent,index): void{
    console.log(envent.target.files);
    const file = envent.target.files[0];
    const suffix = file.name.split('.');
    if (!/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(suffix[1])) {
      this.windowUntils.presentToast('只能上传图片哦');
      return;
    }
    const reader = new FileReader();
    switch (index){
      case 0:
        reader.readAsDataURL(file);
        reader.onload= () => {
          // @ts-ignore
          this.imgsPreview.header = reader.result;
        };
        break;
      case 1:
        reader.readAsDataURL(file);
        reader.onload= () => {
          // @ts-ignore
          this.imgsPreview.section = reader.result;
        };
        break
      case 2:
        reader.readAsDataURL(file);
        reader.onload= () => {
          // @ts-ignore
          this.imgsPreview.footer = reader.result;
        };
        break;
      case 3:
        reader.readAsDataURL(file);
        reader.onload= () => {
          // @ts-ignore
          this.imgsPreview.WeighingList = reader.result;
        };
        break;
    }
  }

  // 时间选择
  timeChange(event): void{
    console.log(event);
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
        this.openPicker(3);
        break;
      case 4:
        this.openPicker(4);
        break;
    }
  }
  async  openPicker(index,numColumns = 1, numOptions = 5, columnOptions = this.defaultColumnOptions){
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
            const a=JSON.stringify(value);
            const b=JSON.parse(a);
            this.InputDatas[index].value=b.col_0.text;
            console.log(`Got Value ${a}`);
          }
        }
      ]
    });

    await picker.present();
  }

   getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col_${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }

    return columns;
  }

   getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }

    return options;
  }
}
