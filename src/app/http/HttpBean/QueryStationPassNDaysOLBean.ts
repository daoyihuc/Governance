import {BaseBody} from "./BaseBody";

export interface QueryStationPassNDaysOLBeanData extends BaseBody{
  data: QueryStationPassNDaysOLBean;
}

export  interface QueryStationPassNDaysOLBean {
   dates?: string[];
   noCarPass?: number[];
   noOverLimit?: number[];
   overLimitRatio?: string[];
}
