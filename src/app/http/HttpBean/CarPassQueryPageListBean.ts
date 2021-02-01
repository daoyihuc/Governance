import {BaseBody} from "./BaseBody";

export interface CarPassQueryPageListBeanData extends BaseBody{
  data: CarPassQueryPageListBean;
}

export  interface CarPassQueryPageListBean {
   data?: Data[];
   pageNo?: number;
   pageSize?: number;
   totalPages?: number;
   totalRows?: number;
}

export interface Data {
   id?: string;
   overLimited?: string;
   stationName?: string;
   truckNoFront?: string;
}


