import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LandingServicesComponent } from '../landing-services/landing-services.component';
import { LandingProcessComponent } from '../landing-process/landing-process.component';
import { LandingSuccessStoriesComponent } from '../landing-success-stories/landing-success-stories.component';
import { LandingTestimonialsComponent } from '../landing-testimonials/landing-testimonials.component';
import { LandingCtaComponent } from '../landing-cta/landing-cta.component';
import { AboutComponent } from '../../about/about/about.component';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LandingServicesComponent,
    LandingProcessComponent,
    LandingSuccessStoriesComponent,
    LandingTestimonialsComponent,
    LandingCtaComponent,
    AboutComponent,
    DividerModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  scrollToServices() {
    if (typeof document !== 'undefined') {
      const element = document.getElementById('services-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
