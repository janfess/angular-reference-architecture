import { Injectable } from '@angular/core';
import { CheckForUpdateService } from './check-for-update.service';
import { HandleUnrecoverableStateService } from './handle-unrecoverable-state.service';
import { SwUpdateBroadcastService } from './sw-update-broadcast.service';
import { UpdateToastService } from './update-toast.service';
import { IdleReloadService } from './idle-reload.service';

@Injectable({ providedIn: 'root' })
export class SwBootstrap {
  constructor(
    _: CheckForUpdateService,
    __: UpdateToastService,
    ___: HandleUnrecoverableStateService,
    ____: SwUpdateBroadcastService,
    _____: IdleReloadService,
  ) {}
}
