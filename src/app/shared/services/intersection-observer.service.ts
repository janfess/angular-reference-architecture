import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IntersectionObserverService {
  private observers: Map<string, IntersectionObserver> = new Map();

  /**
   * Retrieves a shared IntersectionObserver or creates a new one.
   * @param id Unique identifier for the observer.
   * @param callback Callback function for the observer.
   * @param options IntersectionObserver options.
   * @returns IntersectionObserver instance.
   */
  getObserver(
    id: string,
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit
  ): IntersectionObserver {
    if (this.observers.has(id)) {
      return this.observers.get(id)!;
    }

    const observer = new IntersectionObserver(callback, options);
    this.observers.set(id, observer);
    return observer;
  }

  /**
   * Disconnects and removes an IntersectionObserver.
   * @param id Unique identifier for the observer.
   */
  disconnectObserver(id: string): void {
    if (this.observers.has(id)) {
      this.observers.get(id)!.disconnect();
      this.observers.delete(id);
    }
  }
}
