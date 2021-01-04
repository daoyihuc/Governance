import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

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
    // 过滤掉不需要token的请求
    // if (!needToken) {
    //   req = req.clone({
    //     url,
    //   });
    // } else {
    //
    // }


    // const headers1 = req.headers;
    // console.log(headers1, '545');
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
