import {BaseBody} from "./BaseBody";


export interface QueryTopOLTruckByUnitCodeBeanData extends BaseBody{
  data: QueryTopOLTruckByUnitCodeBean[];
}

export  interface QueryTopOLTruckByUnitCodeBean {
   id?: string;
   olr?: string;
   truckNoColor?: string;
   truckNoFront?: string;
   unitCode?: string;
}
