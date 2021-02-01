import {BaseBody} from "./BaseBody";

export interface passCatDetailsBeanData extends BaseBody{
  data: PassCatDetailsBean;
}


export  interface PassCatDetailsBean {
   axisNum?: string;
   direction?: string;
   imgFile1?: string;
   imgFile2?: string;
   imgFile3?: string;
   imgFile5?: string;
   overLimited?: string;
   overRate?: string;
   previewDate?: string;
   speed?: string;
   totalWeight?: string;
   truckNoFront?: string;
   weightLimited?: string;
}
