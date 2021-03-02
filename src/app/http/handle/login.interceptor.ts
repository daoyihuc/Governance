import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {isHttp} from '../../Base/Constans';
import {Headers, HeadersFile, observes, reType} from '../header';

const ignoreToken = ['doLogin'];
@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {}

  headers1 = Headers;
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 先补全请求协议
    const url = req.url;
    const needToken = ignoreToken.filter(u => url.match(u));
    // if (url.indexOf('http://') < 0 || url.indexOf('https://') < 0) {
    //   url = 'http://' + url;
    // }

    if (!isHttp){
      return ;
    }

    if(req.headers.keys().length === 0){
      Headers.JWTHeaderName = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '12';
      HeadersFile.JWTHeaderName = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '12';
      let headers1 = {
        JWTHeaderName: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '12'
      };
      // headers1.append('JWTHeaderName',sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '12');
      console.log("daoyiHeader", headers1);

      // @ts-ignore
      req = req.clone({
        headers: new HttpHeaders(headers1),
        params: null,
        reportProgress: false,
        responseType: 'json',
        withCredentials: false,
      });
    }else{
      //
      Headers.JWTHeaderName = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '12';
      HeadersFile.JWTHeaderName = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '12';
      this.headers1["Content-Type"] = req.headers.get("Content-Type");
      // this.headers1.append('JWTHeaderName',sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '12');
      this.headers1.Accept = req.headers.get("Accept");
      this.headers1.JWTHeaderName = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '12';

      console.log("header", req.headers.keys().length);
      console.log("uri", req.url);
      console.log("Content", req.headers.get("Content-Type"));

      req = req.clone({
        headers: new HttpHeaders(this.headers1),
        params: null,
        reportProgress: false,
        responseType: 'json',
        withCredentials: false,
      });
    }




    // console.log(sessionStorage.getItem('token'));
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // console.log(event);
            if (event.body.code === 1002 || event.body.code === 1008) {
              // 跳转错误页面
              sessionStorage.clear();
              this.router.navigate(['/login']);
            }
          }
        },
        error => {
          // token过期 服务器错误等处理
        }));
  }
}
