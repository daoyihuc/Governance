import {BaseBody} from './BaseBody';



export  interface enterpriseGetByIdBean extends BaseBody{
  data: enterpriseGetByIdBeanData;
}

// 0： 非现场监测点 1: 精监测
// {
//   "weighname": "S323福临非现场检测点",
//   "weighnum": "43012106",
//   "weighType": "0"
// }

export  interface enterpriseGetByIdBeanData {
  videoFile: string;
  overRate: any;
  overLimited: any;
  weightLimited: any;
  totalWeight: any;
  axisNum: any;
  createTime: any;
  previewCode: any;
  truckNoFront: any;
  data?: string;
}
