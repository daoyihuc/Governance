import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import * as $ from 'jquery';
import {HttpServiceService} from '../../http/http-service.service';
import {ToastController} from '@ionic/angular';
import {ToastService} from '../../utils/toast.service';
import {ImgPath} from "../../Base/Constans";

declare var EZUIKit: any;

@Component({
  selector: 'app-weighing-details',
  templateUrl: './weighing-details.component.html',
  styleUrls: ['./weighing-details.component.scss']
})
export class WeighingDetailsComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService,
    private toast: ToastService,
  ) { }

  AccessToken: any = sessionStorage.getItem("AccessToken");
  liData = [
    {title: '车牌号码', src: '#'},
    {title: '检测编码', text: '10675 '},
    {title: '过车时间', text: '2020-09-08 15:17:32 '},
    {title: '轴数', text: '6 '},
    {title: '车货总重（吨）', text: ' '},
    {title: '车货限重（吨）', text: ' '},
    {title: '超限量（吨）', text: ' '},
    {title: '超限率（%）', text: ' '},
  ];
  videoSrc = '';
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 2000,
    },
    loop: true
  };
  banner = [];

  ImgPath = ImgPath;


  ngOnInit(): void {
    let data = {id: 0};
    this.router.queryParams.subscribe(params => {
      data.id = params.id;
    });
    this.getData(data);
  }

  // 获取数据
  getData(data): void{
    // @ts-ignore
    this.http.enterpriseGetById(data).subscribe(value => {
      console.log(value);
      if (value.body.code === 0 && value.body.data){
          const item = value.body.data;
          this.liData[0].src = this.ImgPath+item.imgFile3;
          this.liData[1].text = item.previewCode;
          this.liData[2].text = item.createTime;
          this.liData[3].text = item.axisNum;
          this.liData[4].text = item.totalWeight;
          this.liData[5].text = item.weightLimited;
          this.liData[6].text = item.overLimited;
          this.liData[7].text = item.overRate;
          this.videoSrc = item.videoFile;
          value.body.data.imgFileList.forEach((e,i)=>{
            this.banner.push(e);
          });
      }else{
        this.toast.presentToast(value.body.message);
      }
    });
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
  initVedio(url): void{
    console.log(url);
    const ids = "myPlayer";
    console.log("当前id："+ids);
    const de= new EZUIKit.EZUIPlayer({
      id: ids,
      autoplay: true,
      url: url,
      accessToken: this.AccessToken,
      decoderPath: './assets',
      height: 149
    });
  }

  onClose(): void{// 关闭
    console.log('1231232');
    this.windowUntils.onBack();
  }

}
