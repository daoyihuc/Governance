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
import {Headers,HeadersFile} from "../header";

const ignoreToken = ['doLogin'];
@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {}

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

    Headers.JWTHeaderName = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '12';
    HeadersFile.JWTHeaderName = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '12';
    let headers1 = req.headers;
    headers1.append('JWTHeaderName',sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '12');
    console.log(headers1, '545');

    req = req.clone({
      headers: headers1,
    });

    // console.log(sessionStorage.getItem('token'));
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // console.log(event);
            if (event.body.code === 1002) {
              // 跳转错误页面
              // sessionStorage.clear();
              // this.router.navigate(['/login']);
            }
          }
        },
        error => {
          // token过期 服务器错误等处理
        }));
  }
}
