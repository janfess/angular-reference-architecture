import { Injectable, inject } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SwUpdateBroadcastService {
  private swUpdate = inject(SwUpdate);
  private channel = new BroadcastChannel('sw-updates');

  constructor() {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      )
      .subscribe(() => {
        this.channel.postMessage({ type: 'UPDATE_READY' });
      });

    this.channel.onmessage = (event) => {
      if (event.data?.type === 'UPDATE_READY') {
        location.reload();
      }
    };
  }
}
