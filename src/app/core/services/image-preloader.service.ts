import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagePreloaderService {
  preloadImage(url: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        observer.next(true);
        observer.complete();
      };
      img.onerror = () => {
        observer.next(false);
        observer.complete();
      };
    });
  }

  preloadImages(urls: string[]): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let loadedCount = 0;
      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === urls.length) {
            observer.next(true);
            observer.complete();
          }
        };
        img.onerror = () => {
          observer.next(false);
          observer.complete();
        };
      });
    });
  }
}
