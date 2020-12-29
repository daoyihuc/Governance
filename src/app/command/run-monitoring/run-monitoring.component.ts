import {AfterContentInit, AfterViewInit, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';

declare var AMap: any;

@Component({
  selector: 'app-run-monitoring',
  templateUrl: './run-monitoring.component.html',
  styleUrls: ['./run-monitoring.component.scss']
})
export class RunMonitoringComponent implements OnInit, DoCheck, OnDestroy, AfterViewInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) {


  }

  jumpUrl = [
    {src: '/command/runMonitoring'},
    {src: '/command/runDiagram'},
  ];

  tabUrl = [
    {src: '/command/runMonitoring'},
    {src: '/command/sourceIndex'},
    {src: '/command/commandIndex'},
    {src: '/queryAll/index'},
  ];

  maps: any = null; // 地图空间
  infoWindow: any = null; // 信息彈窗
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
    console.log('初始化');
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

  onJump(index): void {
    this.route.navigate([this.jumpUrl[index].src]);
  }

  onTabJump(index): void {
    this.route.navigate([this.tabUrl[index].src]);
  }

  initData(): void {
    const a = {
      Latitude: 0,
      longitude: 0,
      title: ''
    };
    const b = {
      Latitude: 0,
      longitude: 0,
      title: ''
    };
    const c = {
      Latitude: 0,
      longitude: 0,
      title: ''
    };

    a.Latitude = 112.551885;
    a.longitude = 28.277483;
    a.title = '宁乡';
    this.location.push(a);
    b.Latitude = 112.580037;
    b.longitude = 28.287989;
    b.title = '宁乡政府';
    this.location.push(b);
    c.Latitude = 112.45936;
    c.longitude = 28.274535;
    c.title = 'G319收费站';
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
    // const adiw = new AMap.AdvancedInfoWindow();
    // this.maps.plugin(adiw);
    // this.maps.setInfoWindowAdapter(this);
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
    // 创建一个 Marker 实例：
    const marker = new AMap.Marker({
      position: new AMap.LngLat(obj.Latitude, obj.longitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: obj.title,
      icon: '../../../assets/img/zhichaozhan.png',
    });

    marker.on('click', this.showInfoM);
// 将创建的点标记添加到已有的地图实例：
    this.maps.add(marker);
  }

  ngDoCheck(): void {
    if (this.maps == null) {
      this.getMap();
      this.initData();
      console.log('监测中');
    }
    console.log('监测中2');
  }

  ngOnDestroy(): void {
    this.maps = null;
    console.log('销毁');
  }

  ngAfterViewInit(): void {
    console.log('页面加载完成');
    setTimeout(() => {
      this.getMap();
      this.initData();
    }, 500);

  }

  showInfoM(e): void {
    const contents = '' +
      '<div class="page-box" style="z-index: 899" id="daoyi">\n' +
      '       <div class="page-card-header">\n' +
      '<script>alert("ddaoas")</script>' +
      '         <p>' + e.target.w.title + '</p>\n' +
      '       </div>\n' +
      '</div>';
    const text = '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置点击了marker！';
    const text1 = '您在 [ ' + e.target.w.title + ' ] 的位置';
    console.log(e);
    alert(text1);
    // alert(JSON.parse(e));


    // 创建 infoWindow 实例
    // todo: 解释重要参数示意

// 创建 infoWindow 实例
    this.infoWindow = new AMap.InfoWindow({
      anchor: 'top-left',
      isCustom: true,  // 使用自定义窗体
      content: contents  // 传入 dom 对象，或者 html 字符串
    });

    console.log(this.infoWindow);
// 打开信息窗体
//     this.infoWindow.open(this.maps, [e.lnglat.getLng(), e.lnglat.getLat()]);
    console.log('完成open');
  }
}
