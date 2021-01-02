import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../utils/window.service";

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss']
})
export class InspectorComponent implements OnInit {

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) { }

  liData = [
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: false},
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: true},
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: false},
    {text: '1.是否悬挂了治超宣传横幅及永久性宣传标志牌？' , isDisabled: false},
  ];

  imgsList = [];
  imgsIndex = 0;

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
  }

}
