import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-cta',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-cta.component.html',
  styleUrls: ['./landing-cta.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingCtaComponent {}
