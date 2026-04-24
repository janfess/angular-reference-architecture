import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderContentAdjusterService {
  private headerContentState = new BehaviorSubject<boolean>(false);

  constructor() {}

  setHeaderContentState(state: boolean) {
    this.headerContentState.next(state);
  }

  getHeaderContentState() {
    return this.headerContentState.asObservable();
  }
}
