import { Component, EventEmitter, Input, OnInit, Output, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.css'
})
export class SchedulerComponent implements OnInit {
  @Input() url: string = 'https://calendar.app.google/8KdrRDXwLHzBvjw67';
  @Output() success = new EventEmitter<void>();
  
  consentGiven = false;
  iframeLoading = true;
  safeUrl: SafeResourceUrl | null = null;
  sanitizedUrl: SafeResourceUrl | undefined;
  isBrowser: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Check if consent was already given in this session
      const storedConsent = localStorage.getItem('google-calendar-consent');
      if (storedConsent === 'true') {
        this.consentGiven = true;
      }
    }
    this.updateUrl();
  }

  updateUrl(): void {
    let finalUrl = this.url;
    if (!finalUrl.includes('?')) {
      finalUrl += '?gv=true';
    } else if (!finalUrl.includes('gv=true')) {
      finalUrl += '&gv=true';
    }
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(finalUrl);
  }

  acceptConsent(): void {
    this.consentGiven = true;
    if (this.isBrowser) {
      localStorage.setItem('google-calendar-consent', 'true');
    }
  }

  onIframeLoad(): void {
    this.iframeLoading = false;
  }
}
