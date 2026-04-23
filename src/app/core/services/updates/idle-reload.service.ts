import { Injectable, inject } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { fromEvent, merge, timer } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IdleReloadService {
  private swUpdate = inject(SwUpdate);
  private IDLE_TIME = 30_000;

  constructor() {
    if (!this.swUpdate.isEnabled) return;

    const activity$ = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'touchstart'),
      fromEvent(document, 'click'),
    );

    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        switchMap(() => activity$.pipe(switchMap(() => timer(this.IDLE_TIME)))),
      )
      .subscribe(() => {
        location.reload();
      });
  }
}
