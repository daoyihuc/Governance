import {BaseBody} from "./BaseBody";


export interface CarNativeReportBeanData extends BaseBody{
  data: CarNativeReportBean;
}

export  interface CarNativeReportBean {
   overPercentList?: OverPercentList[];
   passPercentList?: PassPercentList[];
}

export interface OverPercentList {
   name?: string;
   overNum?: number;
}

export interface PassPercentList {
   name?: string;
   passNum?: number;
}
