import {BaseBody} from "./BaseBody";


export interface TraceBeanData extends BaseBody{
  data: TraceBean;
}

export  interface TraceBean {

   analysisLineVO?: AnalysisLineVO;
   track?: Track[];
}

export interface AnalysisLineVO {
   crossAddress?: string;
   crossName?: string;
   xzb?: string;
   yzb?: string;
}

export interface Track {
   crossAddress?: string;
   crossingid?: string;
   passtime?: string;
   xzb?: string;
   yzb?: string;
}
