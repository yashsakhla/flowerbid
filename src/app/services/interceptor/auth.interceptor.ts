import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Example: Adding an Authorization header
  const authToken = localStorage.getItem('token'); // Replace with actual token logic

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(modifiedReq);
};
