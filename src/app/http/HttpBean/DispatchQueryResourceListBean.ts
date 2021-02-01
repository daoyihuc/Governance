import {BaseBody} from "./BaseBody";

export interface DispatchQueryResourceListBeanData extends BaseBody{
  data: DispatchQueryResourceListBean;
}

export  interface DispatchQueryResourceListBean {

  // 治超检测点
   cxStationList?: CxStationList[];
   // 非现场检测
   fxcStationList?: FxcStationList[];
   // 源头企业
   tenterprise?: Tenterprise[];
   // 视频卡口
   videoCardList?: VideoCardList[];
   // 执法车辆
   zfCar: ZfCar[];
   // 执法人员数据
  zfPerson: ZfPerson[];

}

export interface CxStationList {
   weighaddress?: string;
   xpos?: string;
   ypos?: string;
}

export interface FxcStationList {
   weighaddress?: string;
   xpos?: string;
   ypos?: string;
}

export interface Tenterprise {
   enterpriseName?: string;
   xzb?: string;
   yzb?: string;
}

export interface VideoCardList {
   crossAddress?: string;
   xzb?: string;
   yzb?: string;
}

export interface ZfCar {
  name: string;
  xzb: string;
  yzb: string;
}

export interface ZfPerson {
  name: string;
  xzb: string;
  yzb: string;
}
