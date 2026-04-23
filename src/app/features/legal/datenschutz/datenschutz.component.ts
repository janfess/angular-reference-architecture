import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-datenschutz',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './datenschutz.component.html',
  styleUrls: ['./datenschutz.component.css'],
})
export class DatenschutzComponent {
  constructor() {}
}
