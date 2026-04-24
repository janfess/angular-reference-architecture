import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UpdateToastService {
  private messageService = inject(MessageService);
  private swUpdate = inject(SwUpdate);

  constructor() {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      )
      .subscribe(() => {
        this.messageService.add({
          key: 'update',
          severity: 'info',
          summary: 'Update available',
          detail: 'A new version is available. Reload to update.',
          sticky: true,
          data: {
            reload: () => location.reload(),
          },
        });
      });
  }
}
