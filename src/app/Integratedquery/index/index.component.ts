import {Component, OnInit} from '@angular/core';
import {Baseinterface} from '../../interface/baseinterface';
import {WindowService} from '../../utils/window.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AllQueryConst, BaseConst} from '../../constans/BaseConst';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, Baseinterface {

  datas = AllQueryConst;
  footerData = BaseConst;

  constructor(
    private route: Router, // 路由传递
    private router: ActivatedRoute, // 路由接收者
    private windowUntils: WindowService,
  ) {
  }

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
  // 路由前往
  onSelect(index): void{

    switch (index){
      case 0:
        this.route.navigate(['/queryAll/queryIndex']);
        break;
      case 1:
        this.route.navigate(['/queryAll/passingCar']);
        break;
      case 2:
        this.route.navigate(['/queryAll/queryIndex']);
        break;
      case 3:
        this.route.navigate(['queryAll/queryIndex']);
        break;
    }
  }

}
