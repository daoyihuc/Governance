import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import {HttpServiceService} from "../../http/http-service.service";
import {ToastService} from "../../utils/toast.service";
import {ImgPath} from "../../Base/Constans";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {


  banner = [];
  carNumber = '';
  ban: string[];

  ImgPath = ImgPath;

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService,
    private toast: ToastService,
  ) {
    this.carNumber = this.router.snapshot.paramMap.get("carNumber");
   this.router.paramMap.subscribe(value => {
     // for(let i=0;i<a.length;i++){
     //   this.banner.push(a[i]);
     // }
     console.log(value);
     const params = value['params'];
     params["banner"].split(",").forEach( (e,i) =>{
       this.banner.push(this.ImgPath+e);
     })

     console.log(this.banner);
   });

  }

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: {
      delay: 2000,
    },
    loop: true
  };

  imgsPreview = '';


  content = "";
  requestData: FormData;


  ngOnInit(): void {
    this.requestData = new FormData();
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

  // onSumbit
  onSumbit(): void{
    this.requestData.append("content",this.content);
    this.Http(this.requestData);
  }

  onJump(): void{// 跳转

    this.windowUntils.onBack();

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
    this.requestData.append("files",file);
    switch (index) {
      case 0:
        reader.readAsDataURL(file);
        reader.onload = () => {
          // @ts-ignore
          this.imgsPreview = reader.result;
        };
        break;
    }
  }

  // Http
  Http(data: any): void{

    this.http.infoFeedbackSubmit(data).subscribe( value => {
      if(value.code===0){
        this.onBack();
      }else{
        console.log("文件上传失败"+value.message);
      }
    })
  }

}
