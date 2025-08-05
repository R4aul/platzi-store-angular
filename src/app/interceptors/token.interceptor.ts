import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TokenService } from "../services/token.service";
import { inject } from "@angular/core";


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const token = tokenService.getToken();
  req = addHeaders(req,token);
  return next(req);
};

function addHeaders<T>(request: HttpRequest<T>, token: string | null): HttpRequest<T> {
  if (token) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return request;
}