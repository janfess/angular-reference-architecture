import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

describe('SeoService', () => {
  let service: SeoService;
  let titleServiceSpy: jasmine.SpyObj<Title>;
  let metaServiceSpy: jasmine.SpyObj<Meta>;
  let mockDocument: any;

  beforeEach(() => {
    titleServiceSpy = jasmine.createSpyObj('Title', ['setTitle']);
    metaServiceSpy = jasmine.createSpyObj('Meta', ['updateTag']);
    
    // Mock the DOM document object
    mockDocument = {
      createElement: jasmine.createSpy('createElement').and.callFake((tag) => {
        return { setAttribute: jasmine.createSpy('setAttribute') };
      }),
      head: {
        appendChild: jasmine.createSpy('appendChild'),
        removeChild: jasmine.createSpy('removeChild')
      },
      querySelector: jasmine.createSpy('querySelector').and.returnValue(null),
      querySelectorAll: jasmine.createSpy('querySelectorAll').and.returnValue([]),
      getElementById: jasmine.createSpy('getElementById').and.returnValue(null)
    };

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: titleServiceSpy },
        { provide: Meta, useValue: metaServiceSpy },
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: LOCALE_ID, useValue: 'en-US' }
      ]
    });
    
    service = TestBed.inject(SeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set title and meta tags for the homepage', () => {
    service.updateTagsForUrl('/');
    
    expect(titleServiceSpy.setTitle).toHaveBeenCalled();
    expect(metaServiceSpy.updateTag).toHaveBeenCalledWith(
      jasmine.objectContaining({ name: 'description' })
    );
    expect(metaServiceSpy.updateTag).toHaveBeenCalledWith(
      jasmine.objectContaining({ property: 'og:title' })
    );
  });

  it('should inject canonical links into the document head', () => {
    service.updateTagsForUrl('/about');
    
    expect(mockDocument.createElement).toHaveBeenCalledWith('link');
    expect(mockDocument.head.appendChild).toHaveBeenCalled();
  });
});
