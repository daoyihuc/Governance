import {BaseBody} from "./BaseBody";


export interface TransportGetDriverInfoBeanData extends BaseBody{
  data: TransportGetDriverInfoBean;

}

export  interface TransportGetDriverInfoBean {
   address?: string;
   archiveCode?: string;
   certificateStatus?: string;
   driverIssueDate?: string;
   driverIssuingAuthority?: string;
   driverLicenseNumber?: string;
   endDate?: string;
   id?: string;
   idCode?: string;
   name?: string;
   sex?: string;
   telephone?: string;
   workingIssueDate?: string;
   workingIssuingAuthority?: string;
   workingQualification?: string;
   workingType?: string;
}
