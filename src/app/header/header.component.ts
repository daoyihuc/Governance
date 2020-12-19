import {Component, Input, OnInit} from '@angular/core';
import {Baseinterface} from "../interface/baseinterface";
import {WindowService} from "../utils/window.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,Baseinterface {

  @Input() name: any;

  constructor(
    private windowServer: WindowService,
  ) { }

  ngOnInit(): void {
  }

  onBack(): void {
    this.windowServer.onBack();
  }

  onHome(): void {
  }

  onSetting(): void {
  }

}
