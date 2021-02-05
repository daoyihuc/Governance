import {BaseBody} from "./BaseBody";


export interface GetSuperviseByIdBeanData extends BaseBody{
  data: GetSuperviseByIdBean;
}

export  interface GetSuperviseByIdBean {
   caseContent?: string[];
   enterpriseName?: string;
   imgPath?: string[];
   remark?: string;
   supervisePerson?: string;
   superviseTime?: string;
}
