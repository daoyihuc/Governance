import {BaseBody} from "./BaseBody";

export interface axleInitBean extends BaseBody{
  data: axleInitBeanData[];
}


export  interface axleInitBeanData {
   axleNum?: string;
   weightLimit?: string;
}
