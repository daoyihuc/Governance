import {escapeRegExp} from "@angular/compiler/src/util";
import {BaseBody} from "./BaseBody";


export interface TruckInfoBeanData extends BaseBody{
  data: TruckInfoBean;
}


export  interface TruckInfoBean {

   carInfo?: CarInfo;

   carPassImgInfoVO?: CarPassImgInfoVO;

   carPassVO?: CarPassVO;
}

export interface CarInfo {
   blockStatus?: string;
   carNumber?: string;
   color?: string;
   endTime?: string;
   id?: string;
   operateStatus?: string;
   owner?: string;
   transportIssueDate?: string;
   transportIssuingAuthority?: string;
   transportLicenseNumber?: string;
}

export interface CarPassImgInfoVO {
   id?: string;
   imgFile3?: string;
   imgFileList?: string[];
}

export interface CarPassVO {
   axisNum?: string;
   direction?: string;
   id?: string;
   overLimited?: string;
   overRate?: string;
   previewDate?: string;
   stationName?: string;
   totalWeight?: string;
   truckNoFront?: string;
   weightLimited?: string;
}
