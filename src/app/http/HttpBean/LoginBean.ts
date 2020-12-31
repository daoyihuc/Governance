import {BaseBody} from './BaseBody';

export interface LoginBean extends BaseBody{
  data: LoginBeanData;
}

export interface LoginBeanData {
  data?: string;
}
