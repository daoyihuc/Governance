import {BaseBody} from "./BaseBody";

export interface TenterBeanData extends BaseBody{
  data: tenterBean[];
}

export interface  tenterBean {
   enterpriseCode?: string;
   enterpriseName?: string;
}
