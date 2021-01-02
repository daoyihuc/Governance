import {BaseBody} from './BaseBody';

export interface getResourceListBean extends BaseBody{
  data: getResourceListBeanData[];
}

export interface getResourceListBeanData {
  // @ts-ignore
  data?: Array;
}
