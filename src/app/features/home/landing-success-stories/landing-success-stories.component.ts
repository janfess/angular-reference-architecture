import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-success-stories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-success-stories.component.html',
  styleUrls: ['./landing-success-stories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingSuccessStoriesComponent {}
