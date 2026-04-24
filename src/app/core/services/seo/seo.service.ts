import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { seoContent } from './content';
import { environment } from '../../../../environments/environment';

const homepageSeoData = {
  en: {
    title: 'Esser Web Engineering | Senior Angular Architect',
    description:
      'Senior Angular Architect & Web Engineering. Specialized in building scalable enterprise applications, optimizing performance bottlenecks, and delivering high-quality Angular solutions.',
    imageUrl:
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/esser-web-engineering-logo-text-og-moz.jpg',
  },
  de: {
    title: 'Esser Web Engineering | Senior Angular Architekt',
    description:
      'Senior Angular Architekt & Web Engineering. Spezialisiert auf den Aufbau skalierbarer Enterprise-Anwendungen, die Optimierung von Performance-Engpässen und die Lieferung hochkarätiger Angular-Lösungen.',
    imageUrl:
      'https://tricalculator-images.s3.eu-central-1.amazonaws.com/website/esser-web-engineering-logo-text-og-moz.jpg',
  },
};

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(LOCALE_ID) private localeId: string,
  ) {}

  public updateTagsForUrl(urlPath: string): void {
    const lang = (this.localeId.split('-')[0] || 'en') as 'de' | 'en';
    const pathWithoutLang = urlPath || '/';
    const pageContent = seoContent[pathWithoutLang] || seoContent['/'];
    const seoData = pageContent[lang];
    const fullCanonicalPath = `/${lang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    const canonicalUrl = `${environment.baseUrl}${fullCanonicalPath}`;

    if (seoData) {
      this.titleService.setTitle(seoData.title);
      this.metaService.updateTag({
        name: 'description',
        content: seoData.description,
      });
      this.metaService.updateTag({
        property: 'og:title',
        content: seoData.title,
      });
      this.metaService.updateTag({
        property: 'og:description',
        content: seoData.description,
      });
      this.metaService.updateTag({
        property: 'og:image',
        content: seoData.imageUrl,
      });
      this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
      this.metaService.updateTag({ property: 'og:type', content: 'website' });
    }

    this.updateCanonicalUrl(canonicalUrl);
    this.updateHreflangTags(pathWithoutLang);

    const homeRoutes = ['/', '/en/', '/de/'];
    const normalizedUrlPath = urlPath.endsWith('/') ? urlPath : `${urlPath}/`;

    if (homeRoutes.includes(normalizedUrlPath)) {
      const homeLang = normalizedUrlPath.startsWith('/de') ? 'de' : 'en';
      const homeData = homepageSeoData[homeLang];

      this.metaService.updateTag({
        property: 'og:image',
        content: homeData.imageUrl,
      });
      this.setJsonLdForHomepage(homeData, canonicalUrl);
    }
  }

  private updateCanonicalUrl(canonicalUrl: string): void {
    this.removeLink("link[rel='canonical']");
    this.setLink({ rel: 'canonical', href: canonicalUrl });
  }

  private updateHreflangTags(path: string): void {
    this.removeExistingHreflangTags();
    const basePath = environment.baseUrl;
    const pathSegment = path === '/' ? '' : path;

    this.setLink({
      rel: 'alternate',
      hreflang: 'de',
      href: `${basePath}/de${pathSegment}`,
    });
    this.setLink({
      rel: 'alternate',
      hreflang: 'en',
      href: `${basePath}/en${pathSegment}`,
    });
    this.setLink({
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${basePath}/en${pathSegment}`,
    });
  }

  private removeLink(selector: string): void {
    const link: HTMLLinkElement | null = this.doc.querySelector(selector);
    if (link) {
      this.doc.head.removeChild(link);
    }
  }

  private setLink(attributes: { [key: string]: string }): void {
    const link = this.doc.createElement('link');
    Object.keys(attributes).forEach((key) =>
      link.setAttribute(key, attributes[key]),
    );
    this.doc.head.appendChild(link);
  }

  private removeExistingHreflangTags(): void {
    const links: NodeListOf<HTMLLinkElement> = this.doc.querySelectorAll(
      'link[rel="alternate"][hreflang]',
    );
    links.forEach((link) => this.doc.head.removeChild(link));
  }

  private setJsonLdForHomepage(data: any, canonicalUrl: string): void {
    const existingScript = this.doc.getElementById('structured-data-script');
    if (existingScript) {
      this.doc.head.removeChild(existingScript);
    }

    const script = this.doc.createElement('script');
    script.id = 'structured-data-script';
    script.type = 'application/ld+json';

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': ['WebSite', 'WebPage'],
      url: canonicalUrl,
      name: data.title,
      description: data.description,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: data.imageUrl,
        width: '1200',
        height: '675',
      },
    };

    script.textContent = JSON.stringify(structuredData);
    this.doc.head.appendChild(script);
  }
}
