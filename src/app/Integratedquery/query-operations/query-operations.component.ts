import { Component, OnInit } from '@angular/core';
import {OperationConstans, OperationInfoConstans, OperationTitle} from '../constans/queryConst';

@Component({
  selector: 'app-query-operations',
  templateUrl: './query-operations.component.html',
  styleUrls: ['./query-operations.component.css']
})
export class QueryOperationsComponent implements OnInit {
  name = OperationTitle;
  serachData = OperationConstans;
  resultData = OperationInfoConstans;
  constructor() { }

  ngOnInit(): void {
  }

}
