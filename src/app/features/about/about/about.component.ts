import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { LebenslaufComponent } from '../lebenslauf/lebenslauf.component';
import { TechnologienComponent } from '../technologien/technologien.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TooltipModule, RouterModule, AccordionModule, LebenslaufComponent, TechnologienComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  @ViewChild('ueberMich') private ueberMichElement!: ElementRef;
  constructor() {}
}
