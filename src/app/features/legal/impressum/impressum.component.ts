import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.css'],
})
export class ImpressumComponent {
  constructor() {}
}
