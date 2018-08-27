import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MainService {
  option: Subject<string> = new BehaviorSubject<string>(null);
}
