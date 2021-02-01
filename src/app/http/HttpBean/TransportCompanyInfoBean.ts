import {BaseBody} from "./BaseBody";


export interface TransportCompanyInfoBeanData extends BaseBody{
  data: TransportCompanyInfoBean;
}

export  interface TransportCompanyInfoBean {
   address?: string;
   affiliatedUnit?: string;
   businessCertificateNumber?: string;
   businessIssueDate?: string;
   businessIssuingAuthority?: string;
   corporate?: string;
   endDate?: string;
   id?: string;
   socialCode?: string;
   telephone?: string;
   type?: string;
}
