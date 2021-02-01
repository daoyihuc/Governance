import {BaseBody} from "./BaseBody";

export interface ListRealTimeAlarmRecordBeanData extends BaseBody{
  data: ListRealTimeAlarmRecordBean[];
}

export  interface ListRealTimeAlarmRecordBean {
   alarmType?: string;
   axisNum?: string;
   carNumber?: string;
   carPassId?: string;
   direction?: string;
   overLimited?: string;
   overRate?: string;
   passTime?: string;
   stationName?: string;
   totalWeight?: string;
   xzb?: string;
   yzb?: string;
}
