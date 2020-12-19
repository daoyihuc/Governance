import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
/**
* @params: windows 系统工具类
* */
export class WindowService {

  constructor(
    public toastController: ToastController
  ) { }

  // 返回上一级
  public onBack(): void{
    window.history.back();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
