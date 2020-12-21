import { Component, OnInit } from '@angular/core';
import {enterpriseTitle, enterpriseConstans, enterpriseInfoConstans} from '../constans/queryConst';

@Component({
  selector: 'app-queryenterprise',
  templateUrl: './queryenterprise.component.html',
  styleUrls: ['./queryenterprise.component.css']
})
export class QueryenterpriseComponent implements OnInit {
  name = enterpriseTitle;
  serachData = enterpriseConstans;
  resultData = enterpriseInfoConstans;

  constructor() { }

  ngOnInit(): void {
  }

}
