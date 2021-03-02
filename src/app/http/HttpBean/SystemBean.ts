import "reflect-metadata";
import {BaseBody} from "./BaseBody";


export interface SystemBean  extends  BaseBody{
  data: SystemBeanData;
}


export  interface SystemBeanData {
   companyName?: string;
   systemName?: string;
   tel?: string;
   verOwner?: string[];
   version?: string;
}
