import { Component, OnInit } from '@angular/core';
import {
  OperationConstans,
  OperationInfoConstans,
  OperationTitle,
  vehicleConstans,
  vehicleInfoConstans,
  vehicleTitle
} from '../constans/queryConst';

@Component({
  selector: 'app-query-vehicle',
  templateUrl: './query-vehicle.component.html',
  styleUrls: ['./query-vehicle.component.css']
})
export class QueryVehicleComponent implements OnInit {

  name = vehicleTitle;
  serachData = vehicleConstans;
  resultData = vehicleInfoConstans;

  constructor() { }

  ngOnInit(): void {
  }

}
