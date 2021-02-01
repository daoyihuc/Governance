import {BaseBody} from "./BaseBody";

export interface ReportQueryOverNumReportBeanData extends BaseBody{
  data: ReportQueryOverNumReportBean;
}

export  interface ReportQueryOverNumReportBean {

   byAxleList?: ByAxleList[];
   byTimeList?: ByTimeList[];
}

export interface ByAxleList {
   axle2?: number;
   axle3?: number;
   axle4?: number;
   axle5?: number;
   axle6?: number;
   stationName?: string;
}

export interface ByTimeList {
   stationName?: string;
   time1?: number;
   time2?: number;
   time3?: number;
   time4?: number;
   time5?: number;
   time6?: number;
}
