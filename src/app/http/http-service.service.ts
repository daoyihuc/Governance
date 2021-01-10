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
import {getResourceListBean} from './HttpBean/getResourceListBean';
import {getInfoByCodeBean} from './HttpBean/getInfoByCodeBean';
import {getBayonetByCodeBean} from './HttpBean/getBayonetByCodeBean';
import {TweightBean} from './HttpBean/TweightBean';
import {BaseBody} from "./HttpBean/BaseBody";
import {mapListAllBean} from "./HttpBean/mapListAllBean";
import {enterpriseGetByIdBean} from "./HttpBean/enterpriseGetByIdBean";

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
  getResourceList(data: any): Observable<HttpResponse<getResourceListBean>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< LoginBean > ( Api.listRealTimeAlarmRecord, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  //  督查记录
  superviseRecord(data: any): Observable<HttpResponse<getResourceListBean>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< LoginBean > ( Api.superviseRecord, data, this.options)
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
  getBayonetByCode(data: any): Observable<HttpResponse<getBayonetByCodeBean>> {
    this.options.params = data;
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< getBayonetByCodeBean > ( Api.getBayonetByCode, null, this.options)
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
  entering(data: any): Observable<HttpResponse<BaseBody>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< BaseBody > ( Api.entering, data, this.options2)
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
  enterpriseGetById(data: any): Observable<HttpResponse<enterpriseGetByIdBean>> {
    this.options.params = data;
    // @ts-ignore
    return  this.http.post< enterpriseGetByIdBean > ( Api.enterpriseGetById, null, this.options)
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
