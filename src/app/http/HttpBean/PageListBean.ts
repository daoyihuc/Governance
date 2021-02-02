import {BaseBody} from "./BaseBody";

export interface pageListBeanData extends BaseBody{
  data: PageListBean;
}

export  interface PageListBean {
   data?: PageListDate[];
   pageNo?: number;
   pageSize?: number;
   totalPages?: number;
   totalRows?: number;
}

export interface PageListDate {
   enterpriseName?: string;
   id?: string;
   truckNoFront?: string;
}
