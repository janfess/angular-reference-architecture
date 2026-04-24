import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { HeaderContentAdjusterService } from '../../core/services/header-content-adjuster.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ImagePreloaderService } from '../../core/services/image-preloader.service';
import {
  debounceTime,
  fromEvent,
  Subject,
  takeUntil,
} from 'rxjs';

const urls = [
  'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/esser-web-engineering-logo-text-cropped-transparent.webp',
  'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-germany-32.png',
  'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-united-states-minor-outlying-islands-32.png',
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    StyleClassModule,
    RouterLink,
    RouterModule,
    NgClass,
    FormsModule,
    TooltipModule,
    ToggleSwitchModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly LARGE_SCREEN_WIDTH = 992;
  isLargeScreen = false;
  imagesPreloaded: boolean = false;
  germanFlagPath: string =
    'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-germany-32.png';
  englishFlagPath: string =
    'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-united-states-minor-outlying-islands-32.png';
  germanLanguagePath = 'https://janesser.net/de';
  englishLanguagePath = 'https://janesser.net/en';
  languagePath: string = this.germanLanguagePath;
  isMenuOpen: boolean = false;
  language: string = '';
  german: string = '';
  english: string = '';
  imagePath: string = this.germanFlagPath;
  languages = [
    { name: 'German', code: 'DE', flag: 'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-germany-32.png' },
    { name: 'English', code: 'EN', flag: 'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-united-states-minor-outlying-islands-32.png' }
  ];
  selectedLanguage: any;
  isEnglish: boolean = false;

  private destroy = new Subject<void>();
  homeRoute: string = '/';
  animationsDisabled = true;
  isInitialLoad = true; // New flag to track initial load
  private scrollTimeout: any;
  private initialLoadTimeout: any;

  constructor(
    private router: Router,
    private imagePreloaderService: ImagePreloaderService,
    private headerContentAdjusterService: HeaderContentAdjusterService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // Initialize menu state immediately in constructor to prevent flash
    if (isPlatformBrowser(this.platformId)) {
      const initialWidth = window.innerWidth;
      this.isLargeScreen = initialWidth >= this.LARGE_SCREEN_WIDTH;
      this.isMenuOpen = this.isLargeScreen;
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeScreen();
      this.updateFlagAndPath();
      this.imagePreloaderService
        .preloadImages(urls)
        .pipe(takeUntil(this.destroy))
        .subscribe((success) => {
          this.imagesPreloaded = success;
        });
      this.headerContentAdjusterService.setHeaderContentState(this.isBarOpen);
    }
  }

  ngAfterViewInit() {
    if (this.german === 'German') {
      this.language = 'German';
    } else if (this.english === 'English') {
      this.language = 'English';
    }

    // Mark initial load as complete and enable animations after view is stable
    if (isPlatformBrowser(this.platformId)) {
      this.initialLoadTimeout = setTimeout(() => {
        this.isInitialLoad = false;
        this.animationsDisabled = false;
      }, 100);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    if (this.initialLoadTimeout) clearTimeout(this.initialLoadTimeout);
  }

  updateScreenState(width: number): void {
    const wasLargeScreen = this.isLargeScreen;
    this.isLargeScreen = width >= this.LARGE_SCREEN_WIDTH;

    // Only update isMenuOpen if screen size category actually changed
    // This prevents unnecessary state updates during initialization
    if (wasLargeScreen !== this.isLargeScreen) {
      this.isMenuOpen = this.isLargeScreen;
    }
  }

  resizeScreen() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(200), takeUntil(this.destroy))
      .subscribe((event: Event) => {
        const target = event.target as Window;
        this.updateScreenState(target.innerWidth);
      });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.isBarOpen = this.isMenuOpen;
    this.headerContentAdjusterService.setHeaderContentState(this.isBarOpen);
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.isBarOpen = false;
    this.headerContentAdjusterService.setHeaderContentState(false);
  }

  onToggleChange() {
    const newLang = this.isEnglish ? 'EN' : 'DE';
    this.onLanguageChange({ value: { code: newLang } });
  }

  onLanguageChange(event: any) {
    const newLang = event.value.code;
    const currentPath = window.location.pathname;
    let newPath: string;

    if (newLang === 'EN') {
      if (currentPath.startsWith('/de')) {
        newPath = '/en' + currentPath.substring(3);
      } else {
        newPath = '/en';
      }
    } else {
      if (currentPath.startsWith('/en')) {
        newPath = '/de' + currentPath.substring(3);
      } else {
        newPath = '/de';
      }
    }
    window.location.href = newPath;
  }

  toggleLanguage(event: Event) {
    event.preventDefault();
    this.toggleFlag();
    const currentPath = window.location.pathname;
    let newPath: string;

    if (currentPath.startsWith('/de')) {
      newPath = '/en' + currentPath.substring(3);
    } else if (currentPath.startsWith('/en')) {
      newPath = '/de' + currentPath.substring(3);
    } else {
      newPath = this.germanLanguagePath;
    }
    window.location.href = newPath;
  }

  toggleFlag() {
    this.imagePath =
      this.imagePath === this.germanFlagPath
        ? this.englishFlagPath
        : this.germanFlagPath;
  }

  isBarOpen = false;

  updateFlagAndPath() {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/de')) {
      this.german = 'German';
      this.languagePath = this.germanLanguagePath;
      this.imagePath = this.germanFlagPath;
      this.homeRoute = '/';
      this.selectedLanguage = this.languages[0];
      this.isEnglish = false;
    } else if (currentPath.startsWith('/en')) {
      this.english = 'English';
      this.languagePath = this.englishLanguagePath;
      this.imagePath = this.englishFlagPath;
      this.homeRoute = '/';
      this.selectedLanguage = this.languages[1];
      this.isEnglish = true;
    } else {
      this.languagePath = this.germanLanguagePath;
      this.imagePath = this.germanFlagPath;
      this.homeRoute = '/';
      this.selectedLanguage = this.languages[0];
      this.isEnglish = false;
    }
  }

  navigateAndScroll(event?: Event) {
    if (event) event.preventDefault();
    this.router.navigate(['/']).then(() => {
      if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => this.scrollToElement('ueberMich'), 300);
    });
  }

  navigateAndScrollKontakt(event?: Event) {
    if (event) event.preventDefault();
    this.router.navigate(['/']).then(() => {
      if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => this.scrollToElement('kontakt'), 300);
    });
  }

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.isLargeScreen) {
      return;
    }
    const target = event.target as HTMLElement;
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    if (this.isMenuOpen) {
      if (
        menuToggle &&
        !menuToggle.contains(target) &&
        menu &&
        !menu.contains(target)
      ) {
        this.closeMenu();
      }
    }
  }
}
