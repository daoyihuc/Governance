import {BaseBody} from './BaseBody';

export interface getBayonetByCodeBean extends BaseBody{
  data: getBayonetByCodeBeanData;
}

export interface getBayonetByCodeBeanData {
  // @ts-ignore
  data?: Array;
}
