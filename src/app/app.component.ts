import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  signal,
} from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
  Event as RouterEvent,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { HeaderComponent } from './layout/header/header.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { FooterComponent } from './layout/footer/footer.component';
import { SeoService } from './core/services/seo/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HeaderContentAdjusterService } from './core/services/header-content-adjuster.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    DividerModule,
    AccordionModule,
    FooterComponent,
    ProgressSpinner,
    Toast,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private spinnerTimeout: any;
  private destroy$ = new Subject<void>();
  isNavigating = signal(false);
  marginTop = '0px';

  loadingSpinner = {
    root: {
      colorOne: '#f1f5f9',
      colorTwo: '#8e939c',
      colorThree: '#7a8290',
      colorFour: '#6d7686',
    },
  };

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private seoService: SeoService,
    private headerContentAdjusterService: HeaderContentAdjusterService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.showLoadingSpinner();
      
      this.headerContentAdjusterService
        .getHeaderContentState()
        .pipe(takeUntil(this.destroy$))
        .subscribe((state: boolean) => {
          this.marginTop = state ? '190px' : '0px';
        });
    }
  }

  ngOnInit() {
    this.updateSeoTags();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPlausible();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.spinnerTimeout) {
      clearTimeout(this.spinnerTimeout);
    }
  }

  showLoadingSpinner() {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.spinnerTimeout = setTimeout(() => {
          this.isNavigating.set(true);
        }, 500);
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        if (this.spinnerTimeout) {
          clearTimeout(this.spinnerTimeout);
        }
        this.isNavigating.set(false);
      }
    });
  }

  reload() {
    location.reload();
  }

  loadPlausible() {
    const WORKER_URL = environment.workerUrl;

    const script1 = this.renderer.createElement('script');

    script1.src = `${WORKER_URL}/js/script.js`;

    script1.defer = true;
    script1.setAttribute('data-domain', 'janesser.net');

    script1.setAttribute('data-api', `${WORKER_URL}/api/event`);

    this.renderer.appendChild(document.body, script1);

    const script2 = this.renderer.createElement('script');
    script2.text = `
    window.plausible = window.plausible || function() {
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };
  `;
    this.renderer.appendChild(document.body, script2);
  }

  updateSeoTags() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.url;
        this.seoService.updateTagsForUrl(currentUrl);
      });
  }
}
