import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import {HttpServiceService} from "../../http/http-service.service";
import {ToastService} from "../../utils/toast.service";

@Component({
  selector: 'app-command-car',
  templateUrl: './command-car.component.html',
  styleUrls: ['./command-car.component.scss']
})
export class CommandCarComponent implements OnInit {


  requestData = {
    carNumber: "",
  };

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService,
    private toast: ToastService,
  ) {
    this.requestData.carNumber = this.router.snapshot.paramMap.get("carNumber");
  }

    levels = [
    { time : '2020-07-12 16:40:22', name: '粤G25154违法' , span: '超重18.3吨',
      text: '粤G25154经过G106K1631平安县 图雅检测点，平江往浏阳方向。违法 超重1.8吨',
      img: '../../../assets/img/all-safe.png'
    }, { time : '2020-07-12 16:40:22', name: '粤G25154违法' , span: '超重18.3吨',
      text: '粤G25154经过G106K1631平安县 图雅检测点，平江往浏阳方向。违法 超重1.8吨',
      img: '../../../assets/img/all-war.png'
    },
    ];
  temp = -1;
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 2000,
    },
    loop: true
  };

  ngOnInit(): void {
    this.Http(this.requestData);
  }

  accordion(index): void{
    console.log(index);
    if (this.temp === index){
      this.temp = -1;
    }else {
      this.temp = index;
    }
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

  onClose(): void {
    this.windowUntils.onBack();
  }

  Http(data): void{
    this.http.historyIllegal(data).subscribe( value => {
      if(value.body.code===0){
        this.levels = [];
        console.log(value.body.data);
        value.body.data.forEach((e,i) => {
          const  a= { time : '2020-07-12 16:40:22', name: '粤G25154违法' , span: '超重18.3吨',
            text: '粤G25154经过G106K1631平安县 图雅检测点，平江往浏阳方向。违法 超重1.8吨',
            img: '../../../assets/img/all-safe.png'
          };
          a.name = e.carNumber+"违法";
          a.span = "超重"+e.overLimited+"吨"
          a.time = e.illegalDate;
          a.text = e.carNumber+'经过'+e.weighname+' 检测点，平江往浏阳方向。违法 超重'+e.overLimited+'吨'
        })
      }
    });
  }
}
