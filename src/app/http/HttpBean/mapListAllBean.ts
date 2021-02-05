import {BaseBody} from './BaseBody';



export  interface mapListAllBean extends BaseBody{
  data: mapListAllBeanData[];
}

// 0： 非现场监测点 1: 精监测
// {
//   "weighname": "S323福临非现场检测点",
//   "weighnum": "43012106",
//   "weighType": "0"
// }

export  interface mapListAllBeanData {
  enterpriseCode: string;
  enterpriseName: string;
  onlineNum: number;
  yzb: any;
  xzb: any;
  data?: string;
}
