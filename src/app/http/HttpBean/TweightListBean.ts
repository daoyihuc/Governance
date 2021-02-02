import {BaseBody} from "./BaseBody";

export interface TweightListBeanData extends BaseBody{
  data: TweightListBean;
}

export  interface TweightListBean {

   cxWeighPointList?: TweightListData[];

   fxcWeighPointList?: TweightListData[];
}

export interface TweightListData {
   equipmentType?: string;
   id?: string;
   oln?: number;
   passNo?: number;
   wa?: string;
   weighType?: string;
   wid?: string;
   wn?: string;
   wnm?: string;
   xpos?: string;
   ypos?: string;
}

