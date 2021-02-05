import {BaseBody} from "./BaseBody";


export interface GetProvinceCodeBeanData extends BaseBody{
  data: GetProvinceCodeBean[];
}

export  interface GetProvinceCodeBean {
   provinceCode?: string;
   provinceName?: string;
}
