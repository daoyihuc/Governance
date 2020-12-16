import {BaseBean} from './BaseBean';


export interface Test extends BaseBean {
  data: TestData;
}

export  interface TestData {
   time?: number;
}
