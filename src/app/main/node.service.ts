import { AuthenticationService } from './authentication/authentication.service';
import { Subject, Subscription, BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

let config: any;
let path: any;


@Injectable()
export class NodeService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor ( private http: HttpClient, private authenticationService: AuthenticationService) {
    const env = environment;
    console.log(env);
    if (env.production === false) {
      config = require('./../../../server/config/development.json');
    } else {
      config = require('./../../../server/config/production.json');
    }
    path = 'http://'.concat(config.server.host.concat(':'.concat(config.server.ex_port.concat(config.api.sample_route))));
    console.log(path);
  }

  addClient (client: any): Observable<any> {
    console.log(config);
    return this.http.put<any>(`${path}`, client, this.httpOptions);
  }

  removeClient (client: any): Observable<any> {
    const name = encodeURI(client.clientName);
    return this.http.delete<any>(`${path}${name}`, this.httpOptions);
  }

  getClientBalance (client: any): Observable<any> {
    const name = encodeURI(client.clientName);
    return this.http.get<any>(`${path}balance/${name}`, {
      responseType: 'json'
    });
  }

  listClients(): Observable<any> {
    return this.http.get<any>(`${path}`, {
      responseType: 'json'
    });
  }

  depositMoney (client: any): Observable<any> {
    return this.http.post<any>(`${path}moneyDeposit`, client, this.httpOptions);
  }

  transferMoney (client: any): Observable<any> {
    return this.http.post<any>(`${path}moneyTransfer`, client, this.httpOptions);
  }

  withdrawlMoney (client: any): Observable<any> {
    return this.http.post<any>(`${path}moneyWithdrawl`, client, this.httpOptions);
  }

  listActions(): Observable<any> {
    return this.http.get<any>(`${path}actions`, {
      responseType: 'json'
    });
  }

}
