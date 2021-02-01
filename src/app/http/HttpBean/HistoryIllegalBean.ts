import {BaseBody} from "./BaseBody";

export interface HistoryIllegalBeanData extends BaseBody{
  data: HistoryIllegalBean[];
}

export  interface HistoryIllegalBean {
   carNumber?: string;
   id?: string;
   illegalDate?: string;
   overLimited?: string;
   step?: string;
   weighname?: string;
}
