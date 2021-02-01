import {BaseBody} from './BaseBody';

export interface LoginBean extends BaseBody{
  data: LoginBeanData;
}

export interface LoginBeanData {
  token: string,
  unitCode: string,
  unitname: string,
  xzb: string,
  yzb: string
}
