import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Baseinterface} from "../../interface/baseinterface";

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit ,Baseinterface{


  src="";

  constructor(
    private dialog: MatDialogRef<ShowDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.src=this.data
  }

  onBack(): void {
    // 返回站点选择
    this.dialog.close();
  }

  onHome(): void {
    // this.route.navigate(['/home']);
  }

  onSetting(): void { // 个人中心
    // this.route.navigate(['/setting']);
  }
}
