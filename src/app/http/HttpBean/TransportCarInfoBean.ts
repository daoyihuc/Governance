import {BaseBody} from "./BaseBody";


export interface TransportCarInfoBeanData extends BaseBody{
  data: TransportCarInfoBean;
}

export  interface TransportCarInfoBean {
   blockStatus?: string;
   carNumber?: string;
   color?: string;
   endTime?: string;
   id?: string;
   operateStatus?: string;
   owner?: string;
   transportIssueDate?: string;
   transportIssuingAuthority?: string;
   transportLicenseNumber?: string;
}
