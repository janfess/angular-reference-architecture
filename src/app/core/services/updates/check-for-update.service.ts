import { ApplicationRef, Injectable, inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, fromEvent, interval, merge } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CheckForUpdateService {
  private appRef = inject(ApplicationRef);
  private swUpdate = inject(SwUpdate);

  constructor() {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    /**
     * 1️⃣ Wait until the app is stable
     * This ensures the Service Worker can register immediately
     */
    const appIsStable$ = this.appRef.isStable.pipe(first((stable) => stable));

    /**
     * 2️⃣ Periodic background checks (every 6 hours)
     */
    const everySixHours$ = interval(6 * 60 * 60 * 1000);

    /**
     * 3️⃣ Mobile reliability:
     * Re-check when the app/tab becomes visible again
     */
    const appBecomesVisible$ = fromEvent(document, 'visibilitychange').pipe(
      filter(() => document.visibilityState === 'visible'),
    );

    /**
     * 4️⃣ Start checks:
     * - once after stabilization
     * - every 6 hours
     * - whenever the app resumes (mobile)
     */
    merge(appIsStable$, everySixHours$, appBecomesVisible$).subscribe(() => {
      this.swUpdate
        .checkForUpdate()
        .catch((err) =>
          console.error('Service Worker update check failed:', err),
        );
    });
  }
}
