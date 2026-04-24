import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-services.component.html',
  styleUrls: ['./landing-services.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingServicesComponent {
  services = [
    {
      title: $localize`:@@service-1-title:Architecture & Rescue`,
      icon: 'pi pi-code',
      description: $localize`:@@service-1-desc:Sanierung komplexer Legacy-Projekte und Aufbau skalierbarer State-of-the-Art Architekturen mit Angular Signals & RxJS.`
    },
    {
      title: $localize`:@@service-2-title:Performance & SEO`,
      icon: 'pi pi-bolt',
      description: $localize`:@@service-2-desc:Maximale Lighthouse-Scores durch Core Web Vitals Optimierung, intelligentes Preloading und SSR-Exzellenz.`
    },
    {
      title: $localize`:@@service-3-title:Security & Audits`,
      icon: 'pi pi-search',
      description: $localize`:@@service-3-desc:Tiefgehende Sicherheits-Audits und Code-Reviews zur Einhaltung von Enterprise-Standards und OWASP-Compliance.`
    },
    {
      title: $localize`:@@service-4-title:Remote Team Mentoring`,
      icon: 'pi pi-users',
      description: $localize`:@@service-4-desc:Gezielte Weiterentwicklung Ihrer Frontend-Teams durch digitale Architektur-Workshops und Senior-Level Code Reviews.`
    }
  ];
}
