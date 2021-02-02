import {BaseBody} from "./BaseBody";

export interface SelectGcllAndCzllBeanData extends BaseBody{
  data: SelectGcllAndCzllBean;
}


export  interface SelectGcllAndCzllBean {
   gcll?: number;
   czll?: number;
}
