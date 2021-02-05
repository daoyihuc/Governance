import {AfterContentInit, AfterViewInit, Component, DoCheck, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';
import {HttpServiceService} from "../../http/http-service.service";
import {TweightListData} from "../../http/HttpBean/TweightListBean";
import * as echars from 'echarts';

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
    private http: HttpServiceService,
    private el: ElementRef,
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
  runShow = true;

  maps: any = null; // 地图空间
  infoWindow: any = null; // 信息彈窗
  map = [];
  district = [];
  polygons = [];
  // 地图绘制参数
  searchOptions = {
    value: 'district',
    adcode: sessionStorage.getItem("district")
  };

  TweightList: TweightListData[] = [];
  location: any = []; // 锚点参数
  type = 0; // 0: all 1,治超 2： 非治超

  ShowData = {
    equipmentType: null,
    id: null,
    oln: 0,
    passNo: 0,
    wa: "夏铎铺",
    weighType: "0",
    wid: "10",
    wn: "请选择站点",
    wnm: "夏铎铺",
    xpos: "112.620162",
    ypos: "28.239477",
  }

  requestData = {
    days: "7",
    weighNumber: ""
  };

  // popup
  isPopup = false; // 弹窗控制
  xData = ['09.15', '09.16', '09.17', '09.18', '09.19', '09.20', '09.21'];
  yData = [120, 200, 150, 80, 70, 110, 130];

  EChartOptionTwo = {
    xAxis: {
      type: 'category',
      data: this.xData
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    series: [{
      data: this.yData,
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      label: {
        normal: {
          show: true,
          position: 'top',
          color : '#fff'
        }
      },
      lineStyle: {
        color: '#F94670',
        width: 1,
        type: 'solid'
      },
      itemStyle: {
        borderWidth: 3,
        color: '#fff'
      }
    }]
  };

  ngOnInit(): void {
    console.log('初始化');
    this.getMap();
    this.Http();
    setTimeout(() => {

      // this.initData();
    }, 500);

  }

  onBack(): void {
    // this.windowUntils.onBack();
    this.route.navigate(['/home']);
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

  onShow(index): void {
    if (index == 1){
      this.runShow = true;
    }else {
      this.runShow = false;
    }
    this.type = index;
    this.initData();
  }

  initData(): void {


    this.maps.clearMap();
    this.getMap();

    for (let i = 0; i < this.location.length; i++) {
      if(this.type === 0 ){
        this.addMark(this.location[i]);
        continue;
      }
      if(this.location[i].type === this.type-1){
        this.addMark(this.location[i]);
      }

    }
    console.log('count', '' + this.location.length);
  }

  // 地图要放到函数里。
  getMap(): void {
    this.maps = new AMap.Map('container', {
      resizeEnable: false,
      zoom: 8.5,
      center: [sessionStorage.getItem("x"), sessionStorage.getItem("y")], // 此参数用于定位到当前行政区域
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
        const polygon = new AMap.Polygon({
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

    // 0 : 非治超 1： 治超
    let img ="../../../assets/img/zhichaozhan.png";
    switch (obj.type) {
      case 0:
        img="../../../assets/img/zhichaozhan.png";
        break
      case 1:
        img="../../../assets/img/feixcje.png";
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
      title: obj.title,
      icon: icons,
    });

    marker.on('click',()=>{
      this.showInfoM(obj.index);
    });
// 将创建的点标记添加到已有的地图实例：
    this.maps.add(marker);
  }

  ngDoCheck(): void {
    if (this.maps == null) {
      this.getMap();
      // this.initData();
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


  }

  showInfoM(e): void {
    const text1 = '您在 [ ' +e + ' ] 的位置';
    console.log(e);
    console.log(this.searchOptions);
    this.ShowData.wn = this.TweightList[e].wn;
    this.ShowData.oln = this.TweightList[e].oln;
    this.ShowData.passNo = this.TweightList[e].passNo;
    // alert(text1);
    this.requestData.weighNumber =this.TweightList[e].wnm;

    console.log('完成open');
  }

  // http
  Http(): void{
    this.http.tWeighList(null).subscribe( value => {
      console.log(value);
      if(value.body.code === 0){
        value.body.data.cxWeighPointList.forEach( (e,i) => {
          this.TweightList.push(e);
        });
        value.body.data.fxcWeighPointList.forEach((e,i)=>{
          this.TweightList.push(e);
        });
        this.TweightList.forEach((e,i) => {
          const a = {
            Latitude: 0,
            longitude: 0,
            title: '',
            type: 0,
            index: 0,
          };
          a.Latitude = Number(e.xpos);
          a.longitude = Number(e.ypos);
          a.title = e.wn;
          a.index = i;
          a.type = Number(e.weighType);

          this.location.push(a);
        });
        console.log(this.location);
        this.initData();

      }
    });
  }

  // 运行轨迹-查看数据
  queryStationPassNDaysOL(data): void{
    this.http.queryStationPassNDaysOL(data).subscribe( value => {
      if(value.body.code === 0 ){
        this.xData = [];
        value.body.data.dates.forEach((e,i)=>{
          this.xData.push(e);
        });
        this.yData = [];
        value.body.data.noOverLimit.forEach((e,i)=>{
          this.yData.push(e);
        });
        this.EChartOptionTwo.xAxis.data = this.xData;
        this.EChartOptionTwo.series[0].data =this.yData;
        this.initEchars();

      }

    });
  }
  initEchars(): void{
    // 超限量/辆（分轴统计）
    const a1 = this.el.nativeElement.querySelector('#const1');
    // this.barStyle.height =  $(window).height();
    setTimeout(() => {
      const ec1 = echars as any;
      const init1 = ec1.init(a1);
      init1.setOption(this.EChartOptionTwo);
    }, 1000);
  }

  alertShow(index): void{
    switch (index){
      case 1:
        this.isPopup = true;
        break;
      case 2:
        this.isPopup =false;
        break;
      default: {
        this.queryStationPassNDaysOL(this.requestData);
      }
    }
    this.queryStationPassNDaysOL(this.requestData);
  }

}
