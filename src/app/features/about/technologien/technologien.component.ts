import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { ImagePreloaderService } from '../../../core/services/image-preloader.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-technologien',
  standalone: true,
  imports: [Tooltip, NgOptimizedImage],
  templateUrl: './technologien.component.html',
  styleUrl: './technologien.component.css',
})
export class TechnologienComponent implements OnInit, OnDestroy {
  imagesPreloaded = false;
  private destroy = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private imagePreloaderService: ImagePreloaderService,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.preloadImages();
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  preloadImages() {
    const urls = [
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-typescript-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-javascript-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-python-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-go-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-html-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-angular-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-nodejs-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-express-js-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-nestjs-48.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-graphql-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/Strapi.monogram.logo.svg',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-css3-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-figma-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/primeng-logo-black.webp',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-mongodb-a-cross-platform-document-oriented-database-program-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-postgresql-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-sqlite-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-docker-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-kubernetes-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/amazon-web-services-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/cypress.svg',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/jest-32.png',
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/icons8-github-32.png',
    ];
    this.imagePreloaderService
      .preloadImages(urls)
      .pipe(takeUntil(this.destroy))
      .subscribe((success: boolean) => {
        this.imagesPreloaded = success;
      });
  }
}
