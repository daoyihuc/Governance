import {AfterViewInit, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';
import {HttpServiceService} from '../../http/http-service.service';
import {ToastController} from '@ionic/angular';
import {ToastService} from '../../utils/toast.service';
declare var AMap: any;

@Component({
  selector: 'app-command-index',
  templateUrl: './command-index.component.html',
  styleUrls: ['./command-index.component.css']
})
export class CommandIndexComponent implements OnInit, DoCheck , OnDestroy, AfterViewInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService,
    private toast: ToastService,
  ) { }


  tabUrl = [
    {src: '/command/runMonitoring'},
    {src: '/command/sourceIndex'},
    {src: '/command/commandIndex'},
    {src: '/queryAll/index'},
  ];

  liData = [
    {text: '视频卡口', check: false, number: '28'},
    {text: '源头企业', check: false, number: '28'},
    {text: '非现场检测点', check: false, number: '28'},
    {text: '治超检测站', check: false, number: '28'},
    {text: '执法人员', check: false, number: '28'},
    {text: '执法车辆', check: false, number: '28'},
  ];

  liShow = true;

  cardData = [
    {id: '粤HB8982', name: '超限嫌疑车', class: 1,
      list: [
        {span: '报警时间：', p: '2020-09-27 11:40:57'},
        {span: '检测点：', p: 'G106K1612安定检测点'},
        {span: '方向：', p: '平江往浏阳'},
        {span: '总重：', p: '55100'},
        {span: '超限量：', p: '6100'},
        {span: '轴数：', p: '6'},
        {span: '超限率：', p: '12.45%'}
      ]
    }
  ];

  maps: any = null; // 地图空间
  map = [];
  polygons = [];
  district = [];
  // 地图绘制参数
  searchOptions = {
    value: 'district',
    adcode: sessionStorage.getItem("district")
    // adcode: "长沙县"
  };

  location: any = []; // 锚点参数

  ngOnInit(): void {
    // 获取列表
    // @ts-ignore
    this.getList();

    setTimeout( () => {
      this.getMap();
      this.initData();
    }, 500);

    this.HttpAll();
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

  onJump(index): void{// 跳转
    this.route.navigate(['/command/basicInformation']);
  }

  onTabJump(index): void {
    this.route.navigate([this.tabUrl[index].src]);
  }

  // 获取指挥调度任务列表
  getList(): void{
    // @ts-ignore
    this.http.getResourceList().subscribe(value => {
      console.log(value);
      if (value.body.code === 0){
        console.log(value);

        value.body.data.forEach((e,i)=>{
          const a = {id: '粤HB8982', name: '超限嫌疑车', class: 1,carPassId: 'sd',
            list: [
              {span: '报警时间：', p: '2020-09-27 11:40:57'},
              {span: '检测点：', p: 'G106K1612安定检测点'},
              {span: '方向：', p: '平江往浏阳'},
              {span: '总重：', p: '55100'},
              {span: '超限量：', p: '6100'},
              {span: '轴数：', p: '6'},
              {span: '超限率：', p: '12.45%'}
            ]
          }
          a.id = e.carNumber;
          a.name = e.alarmType;
          if(e.alarmType === '超限嫌疑车'){
            a.class = 2
          }else{
            a.class = 1;
          }
          a.carPassId = e.carPassId;
          a.list[0].p = e.passTime;
          a.list[1].p = e.stationName;
          a.list[2].p = e.direction;
          a.list[3].p = e.totalWeight;
          a.list[4].p = e.overLimited;
          a.list[5].p = e.axisNum;
          a.list[6].p = e.overRate;
          this.cardData = [];
          this.cardData.push(a);
        });

      }else{
        this.toast.presentToast(value.body.message);
      }
    });
  }
  // 获取指挥调度的点的资源列表
  HttpAll(): void{
    this.http.queryResourceList(null).subscribe( value => {
      if(value.body.code===0){
        console.log('daoyi',value.body.data);
        this.liData[0].number = "" + value.body.data.videoCardList.length;
        this.liData[1].number = "" + value.body.data.tenterprise.length;
        this.liData[2].number = "" + value.body.data.fxcStationList.length;
        this.liData[3].number = "" + value.body.data.cxStationList.length;
        this.liData[4].number = "" + value.body.data.zfPerson.length;
        this.liData[5].number = "" + value.body.data.zfCar.length;

        for(let i=0;i<value.body.data.videoCardList.length;i++){
          const a = {
            name: "",
            type: 0,
            Latitude: 0,
            longitude: 0,
          };
          a.Latitude  = Number(value.body.data.videoCardList[i].xzb);
          a.longitude  = Number(value.body.data.videoCardList[i].yzb);
          a.name = value.body.data.videoCardList[i].crossAddress;
          this.location.push(a);
        }
        for(let i=0;i<value.body.data.tenterprise.length;i++){
          const a = {
            name: "",
            type: 1,
            Latitude: 0,
            longitude: 0,
          };
          a.Latitude  = Number(value.body.data.tenterprise[i].xzb);
          a.longitude  = Number(value.body.data.tenterprise[i].yzb);
          a.name = value.body.data.tenterprise[i].enterpriseName;
          this.location.push(a);
        }
        for(let i=0;i<value.body.data.fxcStationList.length;i++){
          const a = {
            name: "",
            type: 2,
            Latitude: 0,
            longitude: 0,
          };
          a.Latitude  = Number(value.body.data.fxcStationList[i].xpos);
          a.longitude  = Number(value.body.data.fxcStationList[i].ypos);
          a.name = value.body.data.fxcStationList[i].weighaddress;
          this.location.push(a);
        }
        for(let i=0;i<value.body.data.cxStationList.length;i++){
          const a = {
            name: "",
            type: 3,
            Latitude: 0,
            longitude: 0,
          };
          a.Latitude  = Number(value.body.data.cxStationList[i].xpos);
          a.longitude  = Number(value.body.data.cxStationList[i].ypos);
          a.name = value.body.data.cxStationList[i].weighaddress;
          this.location.push(a);
        }
        for(let i=0;i<value.body.data.zfPerson.length;i++){
          const a = {
            name: "",
            type: 4,
            Latitude: 0,
            longitude: 0,
          };
          a.Latitude  = Number(value.body.data.zfPerson[i].xzb);
          a.longitude  = Number(value.body.data.zfPerson[i].yzb);
          a.name = value.body.data.zfPerson[i].name;
          this.location.push(a);
        }
        for(let i=0;i<value.body.data.zfCar.length;i++){
          const a = {
            name: "",
            type: 5,
            Latitude: 0,
            longitude: 0,
          };
          a.Latitude  = Number(value.body.data.zfCar[i].xzb);
          a.longitude  = Number(value.body.data.zfCar[i].yzb);
          a.name = value.body.data.zfCar[i].name;
          this.location.push(a);
        }

        this.initData();
      }

    });
  }
  isCheck(): void{
    this.initData();
  }


  initData(): void {
    // const a = {
    //   name: "",
    //   type: 0,
    //   Latitude: 0,
    //   longitude: 0,
    // };
    // a.Latitude = 112.551885;
    // a.longitude = 28.277483;
    // this.location.push(a);
    this.maps.clearMap();
    this.getMap();
   this.liData.forEach((e,j) => {
     if(!e.check){
       for (let i = 0; i < this.location.length; i++) {
         if(this.location[i].type === j){
           // this.maps.removeAll();
         }
       }
     }else{
       for (let i = 0; i < this.location.length; i++) {
         if(this.location[i].type === j){
           this.addMark(this.location[i]);
         }
       }
     }
   })
    console.log('count', '' + this.location.length);
  }

  // 地图要放到函数里。
  getMap(): void {
    this.maps = new AMap.Map('container', {
      resizeEnable: false,
      zoom: 8.5,
      center: [112.551885, 28.277483], // 此参数用于定位到当前行政区域
    });
    this.maps.setMapStyle('amap://styles/darkblue');

    this.search(this.searchOptions);
  }

  getData(data, level): void {
    const bounds = data.boundaries;
    if (bounds) {
      for (let i = 0, l = bounds.length; i < l; i++) {
        let polygon = new AMap.Polygon({
          map: this.maps,
          strokeWeight: 1,
          strokeColor: 'rgba(0.2,64,156,0.86)',
          fillColor: 'rgba(0.2,64,156,0.86)',
          fillOpacity: 0.2,
          path: bounds[i]
        });
        this.polygons.push(polygon);
      }
      // this.maps.add(this.polygons)
      // this.maps.setFitView(this.polygons);//视口自适应
    }
  }

  search(obj): void {
    // 清除地图上所有覆盖物
    for (let i = 0, l = this.polygons.length; i < l; i++) {
      this.polygons[i].setMap(null);
    }
    const option = obj;
    const adcode = option.adcode;

    // 行政区划查询
    const opts = {
      subdistrict: 1,   // 返回下一级行政区
      showbiz: false  // 最后一级返回街道信息
    };

    this.maps.plugin('AMap.DistrictSearch', () => {
      // 创建行政区查询对象
      const district = new AMap.DistrictSearch(opts);

      district.setLevel(option.value); // 行政区级别
      district.setExtensions('all');
      // 行政区查询
      // 按照adcode进行查询可以保证数据返回的唯一性
      district.search(adcode, (status, result) => {
        if (status === 'complete') {
          this.getData(result.districtList[0], 0);
        }
      });
    });

  }


  // 添加点
  addMark(obj): void {

    // 0 : 视口 1： 源头 2：非现场  3：治超 4：执法人员 5：执法车辆
    let img ="../../../assets/img/zhifarenyuan.png";
    switch (obj.type) {
      case 0:
        img="../../../assets/img/vedio_k.png";
        break
      case 1:
        img="../../../assets/img/yuantou_icon.png";
        break;
      case 2:
        img="../../../assets/img/feixcje.png";
        break;
      case 3:
        img="../../../assets/img/zhichaozhan.png";
        break;
      case 4:
        img="../../../assets/img/zhifarenyuan.png";
        break;
      case 5:
        img="../../../assets/img/zhifa_icon.png";
        break;
    }


    // 创建 AMap.Icon 实例：
    const icons = new AMap.Icon({
      size: new AMap.Size(14, 14),    // 图标尺寸
      image: img,  // Icon的图像
      imageSize: new AMap.Size(14, 14)   // 根据所设置的大小拉伸或压缩图片
    });

    // 创建一个 Marker 实例：
    const marker = new AMap.Marker({
      position: new AMap.LngLat(obj.Latitude, obj.longitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: obj.name,
      icon: icons,
    });

// 将创建的点标记添加到已有的地图实例：
    this.maps.add(marker);
  }
  // 删除点
  removeMark(obj): void{
    // 创建一个 Marker 实例：
    const marker = new AMap.Marker({
      position: new AMap.LngLat(obj.Latitude, obj.longitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: obj.name,
    });
    this.maps.remove(marker);
  }


  ngDoCheck(): void {
    if (this.maps == null){
      this.getMap();
      this.initData();
      console.log('监测中');
    }
    console.log('监测中2');
  }
  ngOnDestroy(): void {
    this.maps  = null;
    console.log('销毁');
  }

  ngAfterViewInit(): void {
    console.log('页面加载完成');

  }

  isShow(): void {
    this.liShow = !this.liShow;
  }

}
