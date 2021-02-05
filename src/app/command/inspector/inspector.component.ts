import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import {HttpServiceService} from "../../http/http-service.service";
import {BaseBody} from "../../http/HttpBean/BaseBody";
import {ToastService} from "../../utils/toast.service";

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss']
})
export class InspectorComponent implements OnInit {

  requestData = {
    caseCode: '',
    enterpriseCode: '', //企业编码
    enterpriseName: '', // 企业名称
    files: [],
    remark: '', //
    supervisePerson: '',//督查人
    superviseTime: new Date().getTime().toString(),//督查时间

  };

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService,
    private toast: ToastService,
  ) {
    this.router.queryParams.subscribe(params => {
      console.log(params);
      this.requestData.enterpriseCode=params.enterpriseCode;
      this.requestData.enterpriseName=params.enterpriseName;
    });
  }

  liData = [
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: false,code: "0"},
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: true,code: "0"},
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: false,code: "0"},
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: false,code: "0"},
  ];

  imgsList = [];
  imgsIndex = 0;
  overflowShow = true;



  ngOnInit(): void {
    this.superviseInit();
    this.requestData.supervisePerson = sessionStorage.getItem("name");
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

  sumbit(): void{
    console.log(this.requestData);
    this.requestData.caseCode = "";
    this.liData.forEach((e,i)=>{
      if(e.isDisabled){
        this.requestData.caseCode+=e.code+",";
      }
    })
    const  a= new FormData();
    for(let key in this.requestData){
      // console.log(key);
      if(key != "files"&&key!="caseCode"&&key!="enterpriseCode"&&key!="remark"&&key!="supervisePerson"&&key!="superviseTime"){
        console.log(key);
        a.append(key,this.requestData[key]);
      }else if(key === "files"){
        this.requestData[key].forEach((e,i)=>{
          a.append(key,e);
        })
      }
    }
    console.log(a);
    this.supervise(a);
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
    switch (index) {
      case 0:
        reader.readAsDataURL(file);
        reader.onload = () => {
          // @ts-ignore
          this.imgsList[this.imgsIndex] = reader.result;
          this.imgsIndex++;
        };
        break;
    }
    this.requestData.files.push(file);
  }

  superviseInit(): void{
    this.http.superviseInit(null).subscribe( value => {
      if(value.body.code===0){
        value.body.data.forEach((e,i)=>{
          this.liData = [];
          const a= {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: false,code: "0"};
          a.text = e.caseName;
          a.code =e.caseCode;
          this.liData.push(a);
        })
      }
    });
  }

  // 数据提交
  supervise(data): void{
    this.http.supervise(data).subscribe( value => {
      console.log(value);
      if(value.code === 0){
        this.toast.presentToast(value.message);
        setTimeout(()=>{
          this.onBack();
        },1000);
      }
    })
  }

}
