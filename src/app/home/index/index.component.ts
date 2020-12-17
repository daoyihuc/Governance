import { Component, OnInit } from '@angular/core';
import {BaseConst} from '../../constans/BaseConst';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  datas = BaseConst ;

  constructor() { }

  ngOnInit(): void {
  }

}
