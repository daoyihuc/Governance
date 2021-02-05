import {BaseBody} from "./BaseBody";

export interface passCatDetailsBeanData extends BaseBody{
  data: PassCatDetailsBean;
}


export  interface PassCatDetailsBean {
   axisNum?: string;
   direction?: string;
   imgFile3?: string;
  imgFileList: string[];
   overLimited?: string;
   overRate?: string;
   previewDate?: string;
   speed?: string;
   totalWeight?: string;
   truckNoFront?: string;
   weightLimited?: string;
}
