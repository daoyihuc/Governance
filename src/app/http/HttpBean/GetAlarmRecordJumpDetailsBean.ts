import {BaseBody} from "./BaseBody";


export interface GetAlarmRecordJumpDetailsBeanData extends BaseBody{
  data: GetAlarmRecordJumpDetailsBean;
}

export  interface GetAlarmRecordJumpDetailsBean {
  alarmRecordType? : string;
   carInfo?: CarInfo;
   carPassImgInfoVO?: CarPassImgInfoVO;
   illegalStatInfo?: IllegalStatInfo;
   uploadStatus?: number;
}

export interface CarInfo {
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

export interface CarPassImgInfoVO {
   id?: string;
   imgFile3?: string;
   imgFileList?: string[];
}

export interface IllegalStatInfo {
   enforcementLedgerVOList?: EnforcementLedgerVOList[];
   unDealNum?: number;
}

export interface EnforcementLedgerVOList {
   carNumber?: string;
   id?: string;
   illegalDate?: string;
   overLimited?: string;
   step?: string;
   weighname?: string;
}
