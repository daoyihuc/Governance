import {BaseBody} from "./BaseBody";


export interface GetBayonetByCodeBeanData extends  BaseBody{
  data: getBayonetByCodeBean[];
}

export  interface getBayonetByCodeBean {
   address?: string;
   aliveAddress?: string;
   enterpriseCode?: string;
   enterpriseName?: string;
   id?: string;
   onlineFlag?: string;
   serialNum?: string;
   verificationCode?: string;
   xzb?: string;
   yzb?: string;
}
