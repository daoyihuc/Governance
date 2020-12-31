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
