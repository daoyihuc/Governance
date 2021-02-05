import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";
import {HttpServiceService} from "../../http/http-service.service";
import {ImgPath} from "../../Base/Constans";

@Component({
  selector: 'app-supervision-information',
  templateUrl: './supervision-information.component.html',
  styleUrls: ['./supervision-information.component.scss']
})
export class SupervisionInformationComponent implements OnInit {


  request ={
    id: ""
  }

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
    private http: HttpServiceService,
  ) {
    this.request.id =this.router.snapshot.paramMap.get("id");
    this.Http(this.request);
  }

  liData = [
    {title: '督查时间', text: ''},
    {title: '执法人', text: ''},
    {title: '督查地点', text: ' '},
  ];
  workData = [
    {text: ''},
    {text: ''},
    {text: ''},
  ];
  supplement = '';
  imgData = [
    {src: '#'},
    {src: '#'},
    {src: '#'},
    {src: '#'},
    {src: '#'},
    {src: '#'},
    {src: '#'},
  ];
  ngOnInit(): void {
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

  onJump(): void{// 跳转
    this.windowUntils.onBack();
  }
  //
  Http(data): void{
    this.http.getSuperviseById(data).subscribe( value =>  {
      this.workData = [];
      value.body.data.caseContent.forEach((e,i)=>{
       const  a = {text: '1.没有悬挂了治超宣传横幅。'};
       a.text = e;
       this.workData.push(a);
      });
      this.supplement = value.body.data.remark;
      this.liData[0].text = value.body.data.superviseTime;
      this.liData[1].text = value.body.data.supervisePerson;
      this.liData[2].text = value.body.data.enterpriseName;

      value.body.data.imgPath.forEach((e,i)=>{
        this.imgData[i].src = ImgPath+e;
      })
    })
  }

}
