import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

declare const $localize: any;

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs: Breadcrumb[] = [];
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateBreadcrumbs();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.updateBreadcrumbs();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateBreadcrumbs() {
    const url = this.router.url;
    const path = url.split('?')[0]; // Remove query params
    const segments = path.split('/').filter(s => s !== '');
    
    const breadcrumbs: Breadcrumb[] = [];
    
    const isGerman = url.startsWith('/de');
    const langPrefix = isGerman ? '/de' : '/en';

    // Add Home
    breadcrumbs.push({
      label: $localize`:@@breadcrumb-home:Home`,
      url: langPrefix
    });

    let currentUrl = langPrefix;

    segments.forEach((segment) => {
      // Skip language segment if it's explicitly in segments
      if (segment === 'de' || segment === 'en') return;

      currentUrl += `/${segment}`;
      breadcrumbs.push({
        label: this.getLabel(segment),
        url: currentUrl
      });
    });

    this.breadcrumbs = breadcrumbs;
  }

  private getLabel(segment: string): string {
    switch (segment.toLowerCase()) {
      case 'impressum':
        return $localize`:@@breadcrumb-imprint:Impressum`;
      case 'agb':
        return $localize`:@@breadcrumb-agb:AGB`;
      case 'datenschutz':
        return $localize`:@@breadcrumb-privacy:Datenschutz`;
      case 'inquiry':
      case 'projektanfrage':
        return $localize`:@@breadcrumb-inquiry:Projektanfrage`;
      case 'mentoring-prep':
        return $localize`:@@breadcrumb-mentoring-prep:Mentoring Vorbereitung`;
      case 'deep-dive-prep':
        return $localize`:@@breadcrumb-deep-dive-prep:Deep-Dive Vorbereitung`;
      case 'discovery-prep':
        return $localize`:@@breadcrumb-discovery-prep:Erstgespräch Vorbereitung`;
      default:
        return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
    }
  }
}
