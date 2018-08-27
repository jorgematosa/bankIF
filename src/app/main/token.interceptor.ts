import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService) { }

  /**
	 * Intercepts all outgoing requests made by angular
	 * If a token is present on the localStorage, appends it to the header
	 * @param request
	 * @param next
	 */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Check there are no issues with the session token
    let token = '';
    try {
    token = this.auth.getToken();
    } catch (e) {
      // something happens & token isn't there
      return next.handle(request);
    }

    // Clone the request to add the new header.
    request = request.clone({
    setHeaders: {
      'Authorization': `Bearer ${token}`
    }
    });
    console.log(request);
    return next.handle(request);
  }

}

/**
 * https://auth0.com/blog/angularjs-authentication-with-cookies-vs-token/
 * https://auth0.com/docs/quickstart/spa/angular2/04-authorization
 * READ: Considerations for Client-Side Access Control
*/
