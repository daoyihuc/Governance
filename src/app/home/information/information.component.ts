import { Component, OnInit } from '@angular/core';
import {Baseinterface} from '../../interface/baseinterface';
import {InformationConst} from '../../constans/informationConst';
import {WindowService} from '../../utils/window.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit, Baseinterface{

  datas = InformationConst;
  constructor(
    private windowUntils: WindowService,
  ) { }

  ngOnInit(): void {
  }

  onBack(): void {
    this.windowUntils.onBack();
  }

}
