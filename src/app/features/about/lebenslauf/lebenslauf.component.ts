import { Component} from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-lebenslauf',
  standalone: true,
  imports: [
    PanelModule,
    AccordionModule,
    TableModule,
    TimelineModule,
    CardModule,
  ],
  templateUrl: './lebenslauf.component.html',
  styleUrls: ['./lebenslauf.component.css'],
})
export class LebenslaufComponent {
  constructor() {}
}
