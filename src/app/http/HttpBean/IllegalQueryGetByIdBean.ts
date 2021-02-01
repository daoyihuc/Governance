import {BaseBody} from "./BaseBody";

export interface IllegalQueryGetByIdBeanData extends BaseBody{
  data: IllegalQueryGetByIdBean;
}

export  interface IllegalQueryGetByIdBean {
   axisNum?: string;
   direction?: string;
   imgFile3?: string;
   imgFileList?: string[];
   overLimited?: string;
   overRate?: string;
   previewDate?: string;
   speed?: string;
   totalWeight?: string;
   weightLimited?: string;
}
