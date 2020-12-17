import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
* @params: windows 系统工具类
* */
export class WindowService {

  constructor() { }

  // 返回上一级
  public onBack(): void{
    window.history.back();
  }
}
