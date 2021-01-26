import {BaseBody} from "./BaseBody";


export  interface illegalQueryBean extends BaseBody{
   data?:illegalQueryBeanData;

}
export interface illegalQueryBeanData {
  data: Data[];
  pageNo?: number;
  pageSize?: number;
  totalPages?: number;
  totalRows?: number;
}
export interface Data {
   carNumber?: string;
   id?: string;
   operateTime?: string;
   operateUser?: string;
   stationName?: string;
   step?: string;
}
