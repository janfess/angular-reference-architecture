import { TestBed } from '@angular/core/testing';
import { IntersectionObserverService } from './intersection-observer.service';

describe('IntersectionObserverService', () => {
  let service: IntersectionObserverService;
  let mockObserver: any;

  beforeEach(() => {
    // Mock the native IntersectionObserver
    mockObserver = {
      observe: jasmine.createSpy('observe'),
      unobserve: jasmine.createSpy('unobserve'),
      disconnect: jasmine.createSpy('disconnect')
    };

    (window as any).IntersectionObserver = jasmine.createSpy('IntersectionObserver')
      .and.returnValue(mockObserver);

    TestBed.configureTestingModule({
      providers: [IntersectionObserverService]
    });
    
    service = TestBed.inject(IntersectionObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and cache a new observer if it does not exist', () => {
    const callback = () => {};
    const options = { threshold: 0.5 };
    
    const observer1 = service.getObserver('test-id', callback, options);
    
    expect((window as any).IntersectionObserver).toHaveBeenCalledWith(callback, options);
    expect(observer1).toBeTruthy();

    // Fetching it again should return the cached instance, not create a new one
    const observer2 = service.getObserver('test-id', callback, options);
    expect(observer1).toBe(observer2);
    expect((window as any).IntersectionObserver).toHaveBeenCalledTimes(1);
  });

  it('should disconnect and remove the observer from cache', () => {
    const callback = () => {};
    const options = { threshold: 0.5 };
    
    service.getObserver('test-id', callback, options);
    service.disconnectObserver('test-id');

    expect(mockObserver.disconnect).toHaveBeenCalled();
    
    // Requesting it again should create a fresh one since it was removed from cache
    service.getObserver('test-id', callback, options);
    expect((window as any).IntersectionObserver).toHaveBeenCalledTimes(2);
  });
});
