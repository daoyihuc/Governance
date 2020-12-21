import { Component, OnInit } from '@angular/core';
import {OperationConstans, OperationInfoConstans, OperationTitle} from '../constans/queryConst';

@Component({
  selector: 'app-query-operation',
  templateUrl: './query-operation.component.html',
  styleUrls: ['./query-operation.component.scss']
})
export class QueryOperationComponent implements OnInit {
  name = OperationTitle;
  serachData = OperationConstans;
  resultData = OperationInfoConstans;

  constructor() { }

  ngOnInit(): void {
  }

}
