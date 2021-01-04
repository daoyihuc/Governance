import {BaseBody} from './BaseBody';



export  interface TweightBean extends BaseBody{
  data: TweightBeanData[];
}

// 0： 非现场监测点 1: 精监测
// {
//   "weighname": "S323福临非现场检测点",
//   "weighnum": "43012106",
//   "weighType": "0"
// }

export  interface TweightBeanData {
   weighType?: string;
   weighname?: string;
   weighnum?: string;
}
