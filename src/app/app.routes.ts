import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'inquiry',
    loadComponent: () =>
      import('./features/inquiry/projektanfrage/projektanfrage.component').then(
        (m) => m.ProjektanfrageComponent,
      ),
  },
  {
    path: 'impressum',
    loadComponent: () =>
      import('./features/legal/impressum/impressum.component').then(
        (m) => m.ImpressumComponent,
      ),
  },
  {
    path: 'agb',
    loadComponent: () =>
      import('./features/legal/agb/agb.component').then((m) => m.AGBComponent),
  },
  {
    path: 'datenschutz',
    loadComponent: () =>
      import('./features/legal/datenschutz/datenschutz.component').then(
        (m) => m.DatenschutzComponent,
      ),
  },
  {
    path: 'discovery-prep',
    loadComponent: () =>
      import('./features/prep/discovery-prep/discovery-prep.component').then(
        (m) => m.DiscoveryPrepComponent,
      ),
  },
  {
    path: 'mentoring-prep',
    loadComponent: () =>
      import('./features/prep/mentoring-prep/mentoring-prep.component').then(
        (m) => m.MentoringPrepComponent,
      ),
  },
  {
    path: 'deep-dive-prep',
    loadComponent: () =>
      import('./features/prep/deep-dive-prep/deep-dive-prep.component').then(
        (m) => m.DeepDivePrepComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
