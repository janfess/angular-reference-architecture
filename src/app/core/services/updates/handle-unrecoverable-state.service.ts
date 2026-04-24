import { Injectable, inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class HandleUnrecoverableStateService {
  private swUpdate = inject(SwUpdate);

  constructor() {
    if (!this.swUpdate.isEnabled) return;
    this.swUpdate.unrecoverable.subscribe((event) => {
      console.error('Unrecoverable SW state:', event.reason);
      location.reload();
    });
  }
}
