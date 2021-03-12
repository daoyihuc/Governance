import { Injectable, OnInit } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse, HttpEvent,
  HttpHeaderResponse,
  HttpHeaders,
  HttpParams, HttpProgressEvent,
  HttpResponse,
  HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import {Headers, HeadersFile, observes, reType} from './header';
import { Api } from './HttpApi';
import {catchError} from 'rxjs/operators';
import {LoginBean} from './HttpBean/LoginBean';
import {axleInitBean} from './HttpBean/axleInitBean';
import {getResourceListBean, getResourceListBeanData} from './HttpBean/getResourceListBean';
import {getInfoByCodeBean} from './HttpBean/getInfoByCodeBean';
import {getBayonetByCodeBean, GetBayonetByCodeBeanData} from './HttpBean/getBayonetByCodeBean';
import {TweightBean} from './HttpBean/TweightBean';
import {BaseBody} from "./HttpBean/BaseBody";
import {mapListAllBean} from "./HttpBean/mapListAllBean";
import {enterpriseGetByIdBean, EnterpriseGetByIdBeanData} from "./HttpBean/enterpriseGetByIdBean";
import {illegalQueryBean} from "./HttpBean/illegalQueryBean";
import {TransportGetDriverInfoBeanData} from "./HttpBean/TransportGetDriverInfoBean";
import {TransportCompanyInfoBeanData} from "./HttpBean/TransportCompanyInfoBean";
import {TransportCarInfoBeanData} from "./HttpBean/TransportCarInfoBean";
import {CarPassQueryPageListBean, CarPassQueryPageListBeanData} from "./HttpBean/CarPassQueryPageListBean";
import {passCatDetailsBeanData} from "./HttpBean/PassCatDetailsBean";
import {reportQueryOverRateReportBeanData} from "./HttpBean/ReportQueryOverRateReportBean";
import {ReportQueryOverNumReportBeanData} from "./HttpBean/ReportQueryOverNumReportBean";
import {IllegalQueryGetByIdBeanData} from "./HttpBean/IllegalQueryGetByIdBean";
import {DispatchQueryResourceListBeanData} from "./HttpBean/DispatchQueryResourceListBean";
import {ListRealTimeAlarmRecordBeanData} from "./HttpBean/ListRealTimeAlarmRecordBean";
import {GetAlarmRecordJumpDetailsBeanData} from "./HttpBean/GetAlarmRecordJumpDetailsBean";
import {HistoryIllegalBeanData} from "./HttpBean/HistoryIllegalBean";
import {TweightListBeanData} from "./HttpBean/TweightListBean";
import {SelectGcllAndCzllBeanData} from "./HttpBean/SelectGcllAndCzllBean";
import {QueryTopOLTruckByUnitCodeBeanData} from "./HttpBean/QueryTopOLTruckByUnitCodeBean";
import {StationCarPassBeanData} from "./HttpBean/StationCarPassBean";
import {TruckInfoBeanData} from "./HttpBean/TruckInfoBean";
import {pageListBeanData} from "./HttpBean/PageListBean";
import {QueryStationPassNDaysOLBeanData} from "./HttpBean/QueryStationPassNDaysOLBean";
import {GetAccessTokenBean} from "./HttpBean/getAccessTokenBean";
import {SuperviseInitBeanData} from "./HttpBean/SuperviseInitBean";
import {TraceBeanData} from "./HttpBean/TraceBean";
import {CarNativeReportBeanData} from "./HttpBean/CarNativeReportBean";
import {GetProvinceCodeBeanData} from "./HttpBean/GetProvinceCodeBean";
import {GetSuperviseByIdBeanData} from "./HttpBean/GetSuperviseByIdBean";
import {SystemBean} from "./HttpBean/SystemBean";
import {TenterBeanData} from "./HttpBean/tenterBean";

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  // 初始化http请求
  constructor(private http: HttpClient) { }

  options: any = {
    headers: new HttpHeaders(Headers),
    observe: observes,
    params: null,
    reportProgress: false,
    responseType: 'json',
    withCredentials: false,
  };
  options2: any = {
    headers: new HttpHeaders(HeadersFile),
    observe: observes,
    params: null,
    reportProgress: false,
    responseType: 'json',
    withCredentials: false,
  };

  // 登录
  Login(loginBean: any): Observable<HttpResponse<LoginBean>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< LoginBean > ( Api.doLogin, loginBean, this.options)
            .pipe(
              // catchError(this.handleError)
            );
  }

  //
  // 轴数初始化
  axleInit(loginBean: any): Observable<HttpResponse<axleInitBean>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< LoginBean > ( Api.axleInit, loginBean, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }


  // 指挥调度-任务列表
  getResourceList(data: any): Observable<HttpResponse<ListRealTimeAlarmRecordBeanData>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< ListRealTimeAlarmRecordBeanData > ( Api.listRealTimeAlarmRecord, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  督查记录
  superviseRecord(data: any): Observable<HttpResponse<getResourceListBeanData>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< getResourceListBeanData > ( Api.superviseRecord, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  获取单个企业信息
  getInfoByCode(data: any): Observable<HttpResponse<getInfoByCodeBean>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< getInfoByCodeBean > ( Api.getInfoByCode, null, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  获取单个企业视频卡口
  getBayonetByCode(data: any): Observable<HttpResponse<GetBayonetByCodeBeanData>> {
    this.options.params = data;
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< GetBayonetByCodeBeanData > ( Api.getBayonetByCode, null, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  站点初始化
  tweighInit(data: any): Observable<HttpResponse<TweightBean>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< TweightBean > ( Api.tweighInit, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 执法录入
  entering(data: any): Observable<BaseBody> {
    this.options2.params = data;
    // @ts-ignore
    return  this.http.post< BaseBody > ( Api.entering, data)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  源头企业点位地图展示
  mapListAll(data: any): Observable<HttpResponse<mapListAllBean>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< mapListAllBean > ( Api.mapListAll, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  企业过车详情
  enterpriseGetById(data: any): Observable<HttpResponse<EnterpriseGetByIdBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< EnterpriseGetByIdBeanData > ( Api.enterpriseGetById, null, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  违法记录查询
  illegalQueryPageList(data: any): Observable<HttpResponse<illegalQueryBean>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< illegalQueryBean > ( Api.illegalQueryPageList, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 获取驾驶员信息
  getDriverInfo(data: any): Observable<HttpResponse< TransportGetDriverInfoBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< TransportGetDriverInfoBeanData > ( Api.getDriverInfo, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }


  // 获取企业信息
  companyInfo(data: any): Observable<HttpResponse< TransportCompanyInfoBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< TransportCompanyInfoBeanData > ( Api.companyInfo, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 查询车辆信息
  carInfo(data: any): Observable<HttpResponse< TransportCarInfoBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< TransportCarInfoBeanData > ( Api.carInfo, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  过车记录查询
  carPassQueryPageList(data: any): Observable<HttpResponse<CarPassQueryPageListBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< CarPassQueryPageListBeanData > ( Api.carPassQueryPageList, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  过车记录详情
  carPassQueryGetById(data: any): Observable<HttpResponse<passCatDetailsBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< passCatDetailsBeanData > ( Api.carPassQueryGetById, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  //  请求超限率综合统计
  overRateReport(data: any): Observable<HttpResponse<reportQueryOverRateReportBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< reportQueryOverRateReportBeanData > ( Api.overRateReport, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  请求超限量统计
  overNumReport(data: any): Observable<HttpResponse<ReportQueryOverNumReportBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< ReportQueryOverNumReportBeanData > ( Api.overNumReport, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  违法记录详情
  illegalQueryGetById(data: any): Observable<HttpResponse<IllegalQueryGetByIdBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< IllegalQueryGetByIdBeanData > ( Api.illegalQueryGetById, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 指挥调度-获取资源列表
  queryResourceList(data: any): Observable<HttpResponse<DispatchQueryResourceListBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< DispatchQueryResourceListBeanData > ( Api.queryResourceList, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 指挥调度-获取资源列表
  getAlarmRecordJumpDetails(data: any): Observable<HttpResponse<GetAlarmRecordJumpDetailsBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< GetAlarmRecordJumpDetailsBeanData > ( Api.getAlarmRecordJumpDetails, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 指挥调度-信息反馈
  infoFeedbackSubmit(data: any): Observable<BaseBody> {
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post< BaseBody > ( Api.infoFeedbackSubmit, data)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 指挥调度-历史违法记录
  historyIllegal(data: any): Observable<HttpResponse<HistoryIllegalBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< HistoryIllegalBeanData > ( Api.historyIllegal, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 运行监测-查询页面数据
  tWeighList(data: any): Observable<HttpResponse<TweightListBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< TweightListBeanData > ( Api.tWeighList, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 图表分析-今日过车统计
  selectGcllAndCzll(data: any): Observable<HttpResponse<SelectGcllAndCzllBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< SelectGcllAndCzllBeanData > ( Api.selectGcllAndCzll, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 图标分析-超限货车排行
  queryTopOLTruckByUnitCode(data: any): Observable<HttpResponse<QueryTopOLTruckByUnitCodeBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< QueryTopOLTruckByUnitCodeBeanData > ( Api.queryTopOLTruckByUnitCode, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 图表分析-非现场检测点超限率排名
  stationCarPass(data: any): Observable<HttpResponse<StationCarPassBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< StationCarPassBeanData > ( Api.stationCarPass, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 图表分析-超限货车排行-查看
  truckInfo(data: any): Observable<HttpResponse<TruckInfoBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< TruckInfoBeanData > ( Api.truckInfo, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 源头企业实时数据查询
  pageList(data: any): Observable<HttpResponse<pageListBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< pageListBeanData > ( Api.pageList, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 运行轨迹-查看数据计
  queryStationPassNDaysOL(data: any): Observable<HttpResponse<QueryStationPassNDaysOLBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.get< QueryStationPassNDaysOLBeanData > ( Api.queryStationPassNDaysOL, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 图表分析-7天超限率统计
  queryPassNDaysOL(data: any): Observable<HttpResponse<QueryStationPassNDaysOLBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< QueryStationPassNDaysOLBeanData > ( Api.queryPassNDaysOL,data,this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 萤石云token
  getAccessToken(data: any): Observable<HttpResponse<GetAccessTokenBean>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< GetAccessTokenBean > ( Api.getAccessToken,data,this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 督查情况列表初始化
  superviseInit(data: any): Observable<HttpResponse<SuperviseInitBeanData>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< SuperviseInitBeanData > ( Api.superviseInit,data,this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 源头督察
  supervise(data: FormData): Observable<BaseBody> {
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post< BaseBody > ( Api.supervise,data)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 开始追踪
  trace(data: any): Observable<HttpResponse<TraceBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< TraceBeanData > ( Api.trace,data,this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 车辆车籍地统计
  carNativeReport(data: any): Observable<HttpResponse<CarNativeReportBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< CarNativeReportBeanData > ( Api.carNativeReport,data,this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 车辆车籍地统计
  getProvinceCode(data: any): Observable<HttpResponse<GetProvinceCodeBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< GetProvinceCodeBeanData > ( Api.getProvinceCode,data,this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 车辆车籍地统计
  getSuperviseById(data: any): Observable<HttpResponse<GetSuperviseByIdBeanData>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< GetSuperviseByIdBeanData > ( Api.getSuperviseById,data,this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 查询系统信息
  getSystemInfo(data: any): Observable<HttpResponse<SystemBean>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< GetSuperviseByIdBeanData > ( Api.getSystemInfo,data,this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 修改密码
  updatePass(data: any): Observable<HttpResponse<BaseBody>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< GetSuperviseByIdBeanData > ( Api.updatePass,data,this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 修改密码
  tenterpriseInit(data: any): Observable<HttpResponse<TenterBeanData>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< TenterBeanData > ( Api.tenterpriseInit,data,this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }



  private handleError(error: HttpErrorResponse): Observable<never>{
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
