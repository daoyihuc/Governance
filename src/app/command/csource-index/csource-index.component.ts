import {AfterViewInit, Component, DoCheck, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowService} from '../../utils/window.service';

declare var AMap: any;

@Component({
  selector: 'app-csource-index',
  templateUrl: './csource-index.component.html',
  styleUrls: ['./csource-index.component.scss']
})
export class CsourceIndexComponent implements OnInit, DoCheck , OnDestroy, AfterViewInit{

  mackerels: any = []; // 锚点参数
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
          console.log('Clicked save' + JSON.stringify(a));
          const b = JSON.stringify(a);
          const c = JSON.parse(b);
          const year = c.year.value;
          const month = c.month.value;
          const day = c.day.value;
          const hour = c.hour.value;
          const minute = c.minute.value;
          this.ValueTimeStart = year + month + day + hour + minute;
          // this.InputDatas[2].value = this.ValueTime;
          return a;
        }
      }, {
        text: '确定',
        handler: (a) => {
          const b = JSON.stringify(a);
          const c = JSON.parse(b);
          const year = c.year.value;
          const month = c.month.value;
          const day = c.day.value;
          const hour = c.hour.value;
          const minute = c.minute.value;
          this.ValueTimeStart = year + '年' + month + '月' + day + '日' + hour + '点' + minute;
          this.serachData[1].value = this.ValueTimeStart;
          console.log('Clicked Log. Do not Dismiss.' + this.ValueTimeStart);
          return a;
        }
      }]
    };
    this.customPickerOptionsEnd = {
      buttons: [{
        text: '取消',
        handler: (a) => {
          console.log('Clicked save' + JSON.stringify(a));
          const b = JSON.stringify(a);
          const c = JSON.parse(b);
          const year = c.year.value;
          const month = c.month.value;
          const day = c.day.value;
          const hour = c.hour.value;
          const minute = c.minute.value;
          this.ValueTimeEnd = year + month + day + hour + minute;
          // this.InputDatas[2].value = this.ValueTime;
          return a;
        }
      }, {
        text: '确定',
        handler: (a) => {
          const b = JSON.stringify(a);
          const c = JSON.parse(b);
          const year = c.year.value;
          const month = c.month.value;
          const day = c.day.value;
          const hour = c.hour.value;
          const minute = c.minute.value;
          this.ValueTimeEnd = year + '年' + month + '月' + day + '日' + hour + '点' + minute;
          this.serachData[2].value = this.ValueTimeEnd;
          console.log('Clicked Log. Do not Dismiss.' + this.ValueTimeEnd);
          return a;
        }
      }]
    };
  }

  minTime = new Date().toISOString(); // 最小时间
  customPickerOptionsStart: any; // 开始时间设置
  customPickerOptionsEnd: any; // 结束时间设置
  // 绑定时间
  ValueTimeStart: any;
  ValueTimeEnd: any;


  inputShow = true;
  tableData = [
    {name: '夏铎铺镇南方水泥有限公司', car: '湘A9FJ76'},
    {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76'},
    {name: '夏铎铺镇南方水泥有限公司', car: '湘A9FJ76'},
    {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76'},
    {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76'},
    {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76'},
    {name: '双凫铺镇南方水泥有限公司双凫铺石矿', car: '湘A9FJ76'},
  ];
  flexUrl = [
    {src: '/command/weighing'},
    {src: '/command/inspectorRecord'},
    {src: '/command/inspector'},
  ];
  tabUrl = [
    {src: '/command/runMonitoring'},
    {src: '/command/sourceIndex'},
    {src: '/command/commandIndex'},
    {src: '/queryAll/index'},
  ];
  serachData = [
    {
      id: 1,
      name: '企业名称',
      placName: '请输入关键字',
      isRead: false,
      isIcon: false,
      value: '',
    },
    {
      id: 2,
      name: '开始时间',
      placName: '请选择开始时间',
      isRead: true,
      isIcon: false,
      value: '',
    }, {
      id: 3,
      name: '结束时间',
      placName: '请选择结束时间',
      isRead: true,
      isIcon: false,
      value: '',
    },
  ];
  selectedEnterprise = {
    enterpriseName: '招商局物流集团湖南有限公司',
    enterpriseCode: '10003'
  }; // 选中企业
  maps: any = null;
  map = [];
  district = [];
  polygons = [];
  // 地图绘制参数
  searchOptions = {
    value: 'district',
    adcode: '宁乡市'
  };


  mapList = [
    {
      Latitude: 112.551885,
      longitude: 28.277483,
      name: '双凫铺镇三虹建材有限公司',
      isShow: false,
      index: 0
    },
    {
      Latitude: 112.580037,
      longitude: 28.287989,
      name: '2',
      isShow:  false,
      index: 1
    },
    {
      Latitude: 112.45936,
      longitude: 28.274535,
      name: '3',
      isShow: false,
      index: 2
    }
  ];

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

  onJump(index): void {// 跳转
    this.route.navigate(['/command/basicInformation']);
  }

  onFlexJump(index): void {// 跳转
    this.route.navigate([this.flexUrl[index].src],
      { queryParams: this.selectedEnterprise });
  }

  onDetails(index): void {// 详情
    console.log(index);
    this.route.navigate(['/command/weighingDetails']);
  }

  onTabJump(index): void {
    this.route.navigate([this.tabUrl[index].src]);
  }

  isShow(): void {
    this.inputShow = !this.inputShow;
  }

  initData(): void {
    for (let i = 0; i < this.mapList.length; i++) {
      this.addMark(this.mapList[i]);
    }
    console.log('count', '' + this.mapList.length);
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
    // 创建一个 Marker 实例：
    this.mackerels[obj.index] = new AMap.Marker({
      position: new AMap.LngLat(obj.Latitude, obj.longitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: '宁乡',
      // icon: icons,
      content: `<div class="map-box ${obj.isShow ? 'map-box-show' : ''}">
                  <div class="map-img ${obj.isShow ? 'map-img-show' : ''}"><div class="img-span"></div></div>
                  <div class="map-text ${obj.isShow ? 'map-text-show' : ''}">${obj.name}</div>
                </div>`, // 自定义点标记覆盖物内容
    });
    // this.mackerels.push(marker);
    this.mackerels[obj.index].on('click', () => {
      this.mapOnClick(obj.index);
    });
    // this.mackerels[obj.index].marker.on('click', this.mapOnClick(obj.index));
    // 将创建的点标记添加到已有的地图实例：
    this.maps.add(this.mackerels[obj.index]);
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


    setTimeout( () => {
      this.getMap();
      this.initData();
    }, 500);
    console.log('页面加载完成');
  }


//  time
  onTime(id, index): void {
    switch (id){
      case 1:

        break;
      case 2:
        const query = this.el.nativeElement.querySelector('#times');
        query.dispatchEvent(new Event('click'));
        break;
      case 3:
        const query2 = this.el.nativeElement.querySelector('#timesEnd');
        query2.dispatchEvent(new Event('click'));
        break;
      case 4:
        break;
    }
  }
  //  map
  mapOnClick(index): void{
    if (!this.mapList[index].isShow){
      console.log(index);
      // this.mapList.forEach((e, i) => {
      //   if (e.isShow){
      //     this.maps.remove(this.mackerels[i]); // 清除
      //     e.isShow = false; // 赋值
      //     this.addMark(this.mapList[i]); // 渲染
      //   }
      // });
      this.maps.remove(this.mackerels[index]); // 清除
      this.mapList[index].isShow = true; // 赋值
      this.addMark(this.mapList[index]); // 渲染
      // 后渲染层级高
      this.mapList.forEach((e, i) => {
        if (e.index !== index){
          this.maps.remove(this.mackerels[i]); // 清除
          e.isShow = false; // 赋值
          this.addMark(this.mapList[i]); // 渲染
        }
      });
    }else {
      //  跳转
      this.onFlexJump(0);
    }
  }
}
