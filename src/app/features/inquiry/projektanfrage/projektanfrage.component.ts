import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KontaktComponent } from '../../../shared/components/kontakt/kontakt.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { SchedulerComponent } from '../../../shared/components/scheduler/scheduler.component';

@Component({
  selector: 'app-projektanfrage',
  standalone: true,
  imports: [CommonModule, KontaktComponent, BreadcrumbComponent, SchedulerComponent],
  templateUrl: './projektanfrage.component.html',
  styleUrls: ['./projektanfrage.component.css'],
})
export class ProjektanfrageComponent {
  selectedOption: 'form' | 'calendar' | 'consulting' | 'mentoring' | null = null;
  
  freeConsultingUrl = 'https://calendar.app.google/8KdrRDXwLHzBvjw67';
  paidConsultingUrl = 'https://calendar.app.google/k9e8L48iorSkq8nx7';
  mentoringUrl = 'https://calendar.app.google/jnfixVL5LDAtBwWM6'; 

  constructor() {}

  selectOption(option: 'form' | 'calendar' | 'consulting' | 'mentoring' | null) {
    this.selectedOption = option;
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }
}
