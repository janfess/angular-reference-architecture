import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-process.component.html',
  styleUrls: ['./landing-process.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingProcessComponent {
  processSteps = [
    {
      status: $localize`:@@process-1-status:Analyse`,
      icon: 'pi pi-comments',
      description: $localize`:@@process-1-desc:Erstberatung, um Ihre Projektanforderungen und Ziele zu verstehen.`
    },
    {
      status: $localize`:@@process-2-status:Strategie`,
      icon: 'pi pi-map',
      description: $localize`:@@process-2-desc:Entwicklung eines maßgeschneiderten Aktionsplans und Definition der technischen Architektur.`
    },
    {
      status: $localize`:@@process-3-status:Umsetzung`,
      icon: 'pi pi-cog',
      description: $localize`:@@process-3-desc:Agile Entwicklung mit regelmäßigen Updates und Feedback-Loops.`
    },
    {
      status: $localize`:@@process-4-status:Abschluss`,
      icon: 'pi pi-check-circle',
      description: $localize`:@@process-4-desc:Abschließende Tests, Optimierung und erfolgreiches Deployment Ihrer Lösung.`
    }
  ];
}
