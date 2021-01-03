import {BaseBody} from './BaseBody';

export interface getInfoByCodeBean extends BaseBody{
  data: getInfoByCodeBeanData;
}

export interface getInfoByCodeBeanData {
  telephone3: string;
  tradeDuty: string;
  tradeDutyUnit: string;
  telephone2: string;
  popedomDuty: string;
  popedomDutyUnit: string;
  viewScreen: string;
  weighFacility: string;
  throughput: string;
  type: string;
  telephone1: string;
  enterpriseDuty: string;
  address: string;
  data?: object;
}
