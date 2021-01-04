import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Baseinterface} from '../../interface/baseinterface';
import {InformationConst} from '../../constans/informationConst';
import {WindowService} from '../../utils/window.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeConstansInfo} from '../constans/HomeConstans';
import {PickerController} from '@ionic/angular';
import {HttpServiceService} from "../../http/http-service.service";
import {ToastService} from "../../utils/toast.service";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit, Baseinterface {

  datas = InformationConst;
  InputDatas = HomeConstansInfo;

  // 预览图片
  imgsPreview = {
    header: '',
    section: '',
    footer: '',
    WeighingList: ''
  };

  // 图片文件
  imgsData = {
    header: '',
    section: '',
    footer: '',
    WeighingList: ''
  };
  minTime = new Date().toISOString(); // 最小时间
  customPickerOptions: any;

  // 绑定时间
  ValueTime;
  any;

  defaultColumnOptions = [
    [
      // 'Dog'
    ]
  ];
  SiteColumnOptions = [
    [
      // 'Dog'
    ]
  ];

  weightLimits: number; // 限重
  SuperWeightLimit: number;// 超限量
  overRate: string; // 超限率


  // 组件申明
  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private el: ElementRef,
    private pickerController: PickerController, //  选择
    private  http: HttpServiceService, //请求
    private toast: ToastService, // toast 提示

  ) {

    this.customPickerOptions = {
      buttons: [{
        text: '取消',
        handler: (a) => {
          console.log('Clicked save' + JSON.stringify(a));
          let b = JSON.stringify(a);
          const c = JSON.parse(b);
          const year = c.year.value;
          const month = c.month.value;
          const day = c.day.value;
          const hour = c.hour.value;
          const minute = c.minute.value;
          this.ValueTime = year + month + day + hour + minute;
          // this.InputDatas[2].value = this.ValueTime;
          return a;
        }
      }, {
        text: '确定',
        handler: (a) => {
          let b = JSON.stringify(a);
          const c = JSON.parse(b);
          const year = c.year.value;
          const month = c.month.value;
          const day = c.day.value;
          const hour = c.hour.value;
          const minute = c.minute.value;
          this.ValueTime = year + '年' + month + '月' + day + '日' + hour + '点' + minute;
          this.InputDatas[2].value = this.ValueTime;
          console.log('Clicked Log. Do not Dismiss.' + this.ValueTime);
          return a;
        }
      }]
    };
  }

  ngOnInit(): void {
    this.axlexHttp(); // 轴数初始化
    this.HttpSite(); // 站点初始化

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
  onSelectFile(envent, index): void {
    console.log(envent.target.files);
    const file = envent.target.files[0];
    const suffix = file.name.split('.');
    if (!/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(suffix[1])) {
      this.windowUntils.presentToast('只能上传图片哦');
      return;
    }
    const reader = new FileReader();
    switch (index) {
      case 0:
        reader.readAsDataURL(file);
        this.imgsData.header  = file;
        reader.onload = () => {
          // @ts-ignore
          this.imgsPreview.header = reader.result;
        };
        break;
      case 1:
        this.imgsData.section  = file;
        reader.readAsDataURL(file);
        reader.onload = () => {
          // @ts-ignore
          this.imgsPreview.section = reader.result;
        };
        break;
      case 2:
        this.imgsData.footer  = file;
        reader.readAsDataURL(file);
        reader.onload = () => {
          // @ts-ignore
          this.imgsPreview.footer = reader.result;
        };
        break;
      case 3:
        this.imgsData.WeighingList  = file;
        reader.readAsDataURL(file);
        reader.onload = () => {
          // @ts-ignore
          this.imgsPreview.WeighingList = reader.result;
        };
        break;
    }
  }

  // 时间选择
  timeChange(event): void {
    console.log(event);
  }

  // 点击事件
  onClick(id, index): void {
    switch (id) {
      case 0:

        break;
      case 1:

        break;
      case 2:
        let query = this.el.nativeElement.querySelector('#times');
        query.dispatchEvent(new Event('click'));
        break;
      case 3: // 站点选择
        this.openPickerSite(3);
        break;
      case 4: // 轴数选择
        this.openPicker(4);
        break;
    }
  }

  // tslint:disable-next-line:typedef
  async openPicker(index, numColumns = 1, numOptions = this.defaultColumnOptions[0].length,
                   columnOptions = this.defaultColumnOptions) {
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions, 0),
      mode: 'ios',
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
            this.InputDatas[index].value = b.col_0.text;
            this.weightLimits = b.col_0.value;
            this.InputDatas[5].value = b.col_0.value;
            console.log(`Got Value ${a}`);
            console.log('daoyi', this.weightLimits);
          }
        }
      ]
    });

    await picker.present();
  }

  async openPickerSite(index, numColumns = 1, numOptions = this.SiteColumnOptions[0].length, columnOptions = this.SiteColumnOptions) {
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions, 1),
      mode: 'ios',
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
            this.InputDatas[index].value = b.col_0.text;
            console.log(`Got Value ${a}`);
          }
        }
      ]
    });

    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions, type): any {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      if (type === 0) {
        columns.push({
          name: `col_${i}`,
          options: this.getColumnOptions(i, numOptions, columnOptions, 0)
        });
      } else {
        columns.push({
          name: `col_${i}`,
          options: this.getColumnOptions(i, numOptions, columnOptions, 1)
        });
      }

    }

    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions, type): any {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      if (type === 0) {
        options.push({
          text: columnOptions[columnIndex][i % numOptions].axleNum,
          value: columnOptions[columnIndex][i % numOptions].weightLimit,
        });
      } else {
        options.push({
          text: columnOptions[columnIndex][i % numOptions].name,
          value: columnOptions[columnIndex][i % numOptions].id,
        });
      }

    }

    return options;
  }


  // 轴数初始化
  private axlexHttp(): void {
    this.http.axleInit(null).subscribe(value => {
      if (value.body.code === 0) {
        console.log(value);
        for (let i = 0; i < value.body.data.length; i++) {
          this.defaultColumnOptions[0].push(value.body.data[i]);
        }
      }
    });
  }

  // 数据发生改变时
  InputChange(id): void {
    switch (id) {
      case 0:
        this.InputDatas[0].value = this.upperCase(this.InputDatas[0].value);
        break;
    }

    // 判断当前的总量有没有输入 计算超限，超限率 ，
    if (this.InputDatas[1].value) {
      this.SuperWeightLimit = Number(this.InputDatas[1].value) - this.weightLimits;
      if (this.SuperWeightLimit > 0) {
        this.InputDatas[6].value = '' + this.SuperWeightLimit; // 设置超限量
        this.overRate = (this.SuperWeightLimit / this.weightLimits * 100).toFixed(2) + '%';
        this.InputDatas[7].value = this.overRate;
      }

    }
    console.log("daoyi", this.weightLimits);
    console.log("daoyi", this.SuperWeightLimit);
  }

  // 站点初始化
  HttpSite(): void {
    this.http.tweighInit(null).subscribe(value => {


      for (let i = 0; i < value.body.data.length; i++) {
        const a = {
          id: '',
          name: ''
        };
        a.id = value.body.data[i].weighnum; // 编号
        a.name = value.body.data[i].weighname; // 名称
        if (value.body.data[i].weighType === '0') {
          this.SiteColumnOptions[0].push(a); // 非现场
        } else {
          this.SiteColumnOptions[0].push(a); // 精检测
        }
      }
      console.log(this.SiteColumnOptions);

    });
  }

  // 执法录入
  HttpEnTring(data): void {
    this.http.entering(data).subscribe(value => {
      if (value.body.code === 0) {

        this.toast.presentToast(value.body.message);
        this.ClearInputData();
      } else {
        this.toast.presentToast(value.body.message);
      }
    })
  }
  // 数据录入
  save(): void{
    this.AddData();
  }


  // 数据添加
  AddData(): void{
    const fileData = new FormData();
    fileData.append('carNumber',this.InputDatas[0].value);
    fileData.append('totalWeight',this.InputDatas[1].value);
    fileData.append('previewDate',this.InputDatas[2].value);
    fileData.append('station',this.InputDatas[3].value);
    fileData.append('axle',this.InputDatas[4].value);
    fileData.append('weightLimit',this.InputDatas[5].value);
    fileData.append('overWeight',this.InputDatas[6].value);
    fileData.append('overRate',this.InputDatas[7].value);
    fileData.append('overRate1',"dadad");
    fileData.append('file1',this.imgsData.header);
    fileData.append('file2',this.imgsData.section);
    fileData.append('file3',this.imgsData.footer);
    fileData.append('file4',this.imgsData.WeighingList);
    console.log(fileData);
    this.HttpEnTring(fileData);
  }

  // 清除数据模型
  ClearInputData(): void {
    for (let i = 0; i < this.InputDatas.length; i++) {
      this.InputDatas[i].value = '';
    }
  }


  upperCase(str): any {
    const arr = str.split('');
    let newStr = '';
    // 通过数组的forEach方法来遍历数组
    arr.forEach((value) => {
      if (value >= 'a' && value <= 'z') {
        newStr += value.toUpperCase();
      } else {
        newStr += value;
      }

    });
    return newStr;
  }
}
