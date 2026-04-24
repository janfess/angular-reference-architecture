import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-testimonials.component.html',
  styleUrls: ['./landing-testimonials.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingTestimonialsComponent {}
