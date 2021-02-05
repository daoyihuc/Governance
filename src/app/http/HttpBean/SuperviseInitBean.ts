import {BaseBody} from "./BaseBody";

export interface SuperviseInitBeanData extends BaseBody{
  data: SuperviseInitBean[];
}

export  interface SuperviseInitBean {
   caseCode?: string;
   caseName?: string;
}
