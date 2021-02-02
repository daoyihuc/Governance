import {BaseBody} from "./BaseBody";


export interface StationCarPassBeanData extends BaseBody{
  data: StationCarPassBean[];
}

export  interface StationCarPassBean {
   gcl?: number;
   oln?: number;
   olr?: string;
   stationName?: string;
}
