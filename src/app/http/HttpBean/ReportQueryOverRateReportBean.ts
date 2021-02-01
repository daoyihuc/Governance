import {BaseBody} from "./BaseBody";


export interface reportQueryOverRateReportBeanData extends BaseBody{
  data: ReportQueryOverRateReportBean[];
}


export  interface ReportQueryOverRateReportBean {
   gcl?: number;
   oln?: number;
   olr?: string;
   stationName?: string;
}
