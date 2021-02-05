import {BaseBody} from "./BaseBody";


export interface EnterpriseGetByIdBeanData extends BaseBody{
  data: enterpriseGetByIdBean;
}

export  interface enterpriseGetByIdBean {
   axisNum?: string;
   createTime?: string;
   direction?: string;
   id?: string;
   imgFile3?: string;
   imgFileList?: string[];
   overLimited?: string;
   overRate?: string;
   previewCode?: string;
   previewDate?: string;
   previewStationCode?: string;
   speed?: string;
   totalWeight?: string;
   truckNoBack?: string;
   truckNoColor?: string;
   truckNoFront?: string;
   videoFile?: string;
   weightLimited?: string;
}
