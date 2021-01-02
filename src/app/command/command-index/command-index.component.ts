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
    },
    {id: '粤HB8982', name: '超限嫌疑车', class: 2,
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
  district = [];
  polygons = [];
  // 地图绘制参数
  searchOptions = {
    value: 'district',
    adcode: '宁乡市'
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

  // 获取列表
  getList(): void{
    // @ts-ignore
    this.http.getResourceList().subscribe(value => {
      console.log(value);
      if (value.body.code === 0){
        console.log(value);
      }else{
        this.toast.presentToast(value.body.message);
      }
    });
  }

  initData(): void {
    const a = {
      Latitude: 0,
      longitude: 0,
    };
    const b = {
      Latitude: 0,
      longitude: 0,
    };
    const c = {
      Latitude: 0,
      longitude: 0,
    };

    a.Latitude = 112.551885;
    a.longitude = 28.277483;
    this.location.push(a);
    b.Latitude = 112.580037;
    b.longitude = 28.287989;
    this.location.push(b);
    c.Latitude = 112.45936;
    c.longitude = 28.274535;
    this.location.push(c);


    for (let i = 0; i < this.location.length; i++) {
      this.addMark(this.location[i]);
    }
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
          strokeColor: '#0091ea',
          fillColor: '#80d8ff',
          fillOpacity: 0.2,
          path: bounds[i]
        });
        this.polygons.push(polygon);
      }
      // this.maps.setFitView(); // 地图自适应
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

  addMark(obj): void {
    // 创建 AMap.Icon 实例：
    const icons = new AMap.Icon({
      size: new AMap.Size(14, 14),    // 图标尺寸
      image: '../../../assets/img/zhifarenyuan.png',  // Icon的图像
      imageSize: new AMap.Size(14, 14)   // 根据所设置的大小拉伸或压缩图片
    });

    // 创建一个 Marker 实例：
    const marker = new AMap.Marker({
      position: new AMap.LngLat(obj.Latitude, obj.longitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: '宁乡',
      icon: icons,
    });

// 将创建的点标记添加到已有的地图实例：
    this.maps.add(marker);
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

}
