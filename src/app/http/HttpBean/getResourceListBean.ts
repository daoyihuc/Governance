import {BaseBody} from "./BaseBody";

export interface getResourceListBeanData extends BaseBody{
  data: getResourceListBean[];
}

export interface getResourceListBean {
   caseCode?: string;
   enterpriseCode?: string;
   enterpriseName?: string;
   id?: string;
   imgPath?: string;
   remark?: string;
   supervisePerson?: string;
   superviseTime?: string;
}
